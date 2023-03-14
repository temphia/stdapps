<script lang="ts">
  import { getContext } from "svelte";
  import {
    KEY,
    TaskBoard,
    Context,
    formatValue,
    TaskGroup,
    Task,
  } from "./service";
  import RootLayout from "../common/root_layout.svelte";
  import NewGroup from "./panels/new_group.svelte";
  import BoardInner from "./board/board.svelte";
  import NewTask from "./panels/new_task.svelte";
  import EditGroup from "./panels/edit_group.svelte";
  import EditTaskData from "./panels/edit_task_data.svelte";

  export let onGoBack;
  export let board: TaskBoard;

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  let loading = true;
  let tasks = [];

  const load = async () => {
    loading = true;
    const resp = await service.list_board_task(board.slug);
    if (!resp.ok) {
      console.log("err_fetching_tasks", resp);
      return;
    }

    tasks = resp.data.map((v) => formatValue(v));
    loading = false;
  };

  const new_group = () => {
    modal.show_small(NewGroup, {
      onSave: async (slug: string, name: string) => {
        loading = true;
        await service.update_board(board.slug, {
          ...board,
          groups: [...(board.groups || []), { slug, name }],
        });

        modal.close_small();

        const resp = await service.get_board(board.slug);
        board = formatValue(resp.data);
        loading = false;
      },
    });
  };

  const add_card = (group: TaskGroup) => {
    modal.show_small(NewTask, {
      group: group.slug,
      group_name: group.name,

      onSave: async (data: any) => {
        await service.add_task(board.slug, data["slug"], data);
        modal.close_small();
        load();
      },
    });
  };

  const edit_group = (group: TaskGroup) => {
    modal.show_small(EditGroup, {
      board,
      context: ctx,
      group,
    });
  };

  const delete_group = (group: TaskGroup) => {};

  const edit_task_data = (task: Task) => {
    modal.show_big(EditTaskData, {
      board,
      context: ctx,
      id: task.slug,
    });
  };

  const complete_task_move = async (data: {
    task: Task;
    from_group: string;
    to_group: string;
  }) => {
    loading = true;
    await service.update_task(board.slug, data.task.slug, {
      ...data.task,
      group: data.to_group,
    });

    load();
  };

  load();
</script>

<RootLayout
  name="SimpleTasks [{board.name}]"
  actions={{ "↻": load, "+": new_group, "🏠": () => onGoBack && onGoBack() }}
>
  {#if loading}
    <div>Loading</div>
  {:else}
    <BoardInner
      {board}
      {tasks}
      on:add_card={(ev) => add_card(ev.detail)}
      on:edit_group={(ev) => edit_group(ev.detail)}
      on:delete_group={(ev) => delete_group(ev.detail)}
      on:edit_task_data={(ev) => edit_task_data(ev.detail)}
      on:complete_task_group_move={(ev) => complete_task_move(ev.detail)}
    />
  {/if}
</RootLayout>
