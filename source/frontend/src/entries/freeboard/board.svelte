<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import { Block, Board, Context, KEY } from "./service";
  import BoardInner from "./board/board.svelte";
  import NewBlock from "./board/panels/new_block.svelte";
  import { extractLinks, formatBlock } from "./service/format";
  import BlockItem from "./board/block_item.svelte";
  import NewLink from "./board/panels/new_link.svelte";

  export let key: string;
  export let board: Board;
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

    console.log("@formatted_blocks", blocks);
    console.log("@raw", resp.data);

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

  const completeLink = (from: string, to: string) => {
    const block = blocks.filter((v) => v["slug"] === from)[0];
    if (!block) {
      return;
    }

    modal.show_small(NewLink, {
      to,
      from,
      onSave: async (name: string) => {
        loading = true;

        let links = [
          ...(block.links || []),
          {
            to,
            from,
            name,
          },
        ];

        modal.close_small();

        await service.update_board(from, { ...block, links });
        load();
      },
    });
  };

  load();

  $: _link_start_name = null;
  $: _links = extractLinks(blocks);
</script>

<RootLayout
  name="Freeboard"
  actions={{ "↻": load, "+": new_block, "🏠": home, "💾": () => {} }}
>
  {#if loading}
    <div>Loading</div>
  {:else}
    <BoardInner
      link_start_name={_link_start_name}
      {blocks}
      links={_links}
      on:new_link_start={(ev) => (_link_start_name = ev.detail)}
      on:new_link_end={(ev) => {
        const from = _link_start_name;
        _link_start_name = null;
        completeLink(from, ev.detail);
      }}
      on:new_link_cancel={(ev) => (_link_start_name = ev.detail)}
      on:edit_block={(ev) => {
        modal.show_big(BlockItem, {
          edit: true,
          block: getBlock(ev),
        });
      }}

      on:delete_block={async (ev) => {
        await service.delete_board_block(key, ev.detail)
        load()
      }}


    />
  {/if}
</RootLayout>
