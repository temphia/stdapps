<script lang="ts">
  import { getContext } from "svelte";
  import { KEY, TaskBoard, Context, formatValue, TaskGroup } from "./service";
  import RootLayout from "../common/root_layout.svelte";
  import NewGroup from "./panels/new_group.svelte";
  import BoardInner from "./board/board.svelte";
  import NewTask from "./panels/new_task.svelte";

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
      console.log("err_fetching_tasks", resp)
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

  load()

</script>

<RootLayout
  name="SimpleTasks [{board.name}]"
  actions={{ "↻": load, "+": new_group, "🏠": () => onGoBack && onGoBack() }}
>
  {#if loading}
    <div>Loading</div>
  {:else}
    <BoardInner {board} {tasks} on:add_card={(ev) => add_card(ev.detail)} />
  {/if}
</RootLayout>
