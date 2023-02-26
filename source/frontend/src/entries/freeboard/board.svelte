<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import { Block, Context, KEY } from "./service";
  import BoardInner from "./board/board.svelte";
  import NewBlock from "./board/panels/new_block.svelte";
  import { formatBlock } from "./service/format";

  export let key: string;
  export let onGoBack;

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  let loading = true;
  let blocks = [];

  const load = async () => {
    loading = true;
    const resp = await service.list_board_blocks(key);
    if (!resp.ok) {
      console.log("@resp_err", resp);
      return;
    }

    blocks = resp.data.map((v) => formatBlock(v));
    loading = false;
  };

  const new_block = () => {
    modal.show_small(NewBlock, {
      onSave: async (data: Block) => {
        await service.add_board_block(key, data.slug, data);

        const resp = await service.list_board_blocks(key);
        if (!resp.ok) {
          console.log("@resp_err", resp);
          return;
        }

        blocks = resp.data.map((v) => formatBlock(v));
      },
    });
  };

  const home = () => onGoBack && onGoBack();

  const getBlock = (ev) => {
    return blocks.filter((f) => f.name === ev.detail)[0];
  };

  load();
</script>

<RootLayout
  name="Freeboard"
  actions={{ "↻": load, "+": new_block, "🏠": home }}
>
  {#if loading}
    <div>Loading</div>
  {:else}
    <BoardInner
      link_start_name=""
      {blocks}
      board_name=""
      links={[]}
      on:edit_block={(ev) => {
        const block = getBlock(ev);
      }}
    />
  {/if}
</RootLayout>
