<script lang="ts">
  import { formatValue, Task, TasksService } from "../service";
  import Comment from "./_comment.svelte";
  import Layout from "./_layout.svelte";
  import TaskEdit from "./_task_edit.svelte";
  import type { Context, TaskBoard } from "../service";
  import { generateId } from "../../common/id";
  import EditTask from "../panels/edit_task.svelte";

  export let board: TaskBoard;
  export let context: Context;
  export let task: Task;
  export let relaodBoard;

  let id = task.slug;

  let edit;
  let getValue;

  let task_data = {};
  let comments = [];
  let loading = true;

  const service = context.get_service();
  const modal = context.get_modal();

  const load = async () => {
    loading = true;

    const dataresp = service.get_task_data(board.slug, id);
    const commentResp = service.list_task_comment(id);
    const resps = await Promise.all([dataresp, commentResp]);
    if (!resps[0].ok) {
      console.log("@err", resps);
      return;
    }

    task_data = formatValue(resps[0].data);
    comments = resps[1].data.map((v) => formatValue(v));

    console.log("@task_stuff", task_data, comments);

    loading = false;
  };

  load();

  const metaUpdate = async () => {
    modal.close_big();
    modal.show_small(EditTask, {
      ...task,

      onSave: async (data) => {
        await service.update_task(board.slug, task.slug, {
          ...task,
          ...data,
        });
        modal.close_small();

        relaodBoard && relaodBoard();
      },
    });
  };
</script>

<Layout
  comment={loading ? 0 : comments.length}
  bind:edit
  onUpdate={async () => {
    loading = true;

    await service.update_task_data(board.slug, id, {
      ...task_data,
      content: getValue(),
    });

    load();
  }}
  onDelete={async () => {
    loading = true;
    await service.remove_task(id);

    modal.close_big();
  }}
  onEditMeta={metaUpdate}
  onClose={() => modal.close_big()}
>
  {#if loading}
    <div>Loading</div>
  {:else if edit}
    <TaskEdit data={task_data} bind:getValue />
  {:else}
    <Comment
      {comments}
      onComment={async (msg) => {
        loading = true;

        await service.add_task_comment(id, generateId(), {
          user: "user1",
          content: msg,
          time: new Date().toISOString(),
        });

        load();
      }}
    />
  {/if}
</Layout>
