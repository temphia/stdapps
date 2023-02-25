<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import { Context, KEY } from "./service";
  import BoardInner from "./board/board.svelte";
  import NewBlock from "./board/panels/new_block.svelte";

  export let key: string;
  export let onGoBack;

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  const load = async () => {
    const resp = await service.list_board_blocks(key);
  };

  const new_block = () => {
    modal.show_small(NewBlock, {});
  };

  const home = () => onGoBack && onGoBack();
</script>

<RootLayout
  name="Freeboard"
  actions={{ "↻": load, "+": new_block, "🏠": home }}
>
  <BoardInner link_start_name="" blocks={[]} board_name="" links={[]} />
</RootLayout>
