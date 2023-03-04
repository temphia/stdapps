<script lang="ts">
  import { getContext } from "svelte";
  import { KEY, TaskBoard, Context, formatValue } from "./service";
  import RootLayout from "../common/root_layout.svelte";
  import NewGroup from "./panels/new_group.svelte";
  import BoardInner from "./board/board.svelte";

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
          groups: [...(board.groups || []), {  slug, name }],
        });

        const resp = await service.get_board(board.slug);
        board = formatValue(resp.data);
        loading = false;
      },
    });
  };
</script>

<RootLayout
  name="SimpleTasks [{board.name}]"
  actions={{ "↻": load, "+": new_group, "🏠": () => onGoBack && onGoBack() }}
>
  <BoardInner {board} {tasks} />
</RootLayout>
