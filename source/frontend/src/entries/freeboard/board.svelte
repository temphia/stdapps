<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import { Block, Board, Context, KEY } from "./service";
  import BoardInner from "./board/board.svelte";
  import NewBlock from "./panels/new_block.svelte";
  import { extractLinks, formatBlock } from "./service/format";
  import NewLink from "./panels/new_link.svelte";
  import SingleEdit from "./board/single_edit.svelte";

  export let key: string;
  export let board: Board;
  export let onGoBack;

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  let loading = true;
  let blocks = [];
  let meta = {};
  let getMeta;

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

    const resp2 = await service.get_board_meta(key);
    if (resp2.ok) {
      
      console.log("meta_data", resp2.data)

      const raw = resp2.data["value"] || "{}";

      try {
        meta = JSON.parse(raw);
      } catch (error) {
        meta = {};
      }
    }

    loading = false;
  };

  const new_block = () => {
    modal.show_small(NewBlock, {
      onSave: async (data: Block) => {
        await service.add_board_block(key, data.slug, data);
        modal.close_small();
        load();
      },
    });
  };

  const home = () => onGoBack && onGoBack();

  const getBlock = (ev) => {
    return blocks.filter((f) => f.slug === ev.detail)[0];
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
  $: _force_render_epoch_store_thing = {}

  $: console.log("@blocks", blocks);

  const editBlock = (ev) => {
    const block = getBlock(ev);

    modal.show_big(SingleEdit, {
      edit: true,
      block: block,
      onUpdate: async (bid: string, bdata: any) => {
        await service.update_board(bid, { ...block, data: bdata });

        const resp = await service.get_board_block(key, bid);
        if (!resp.ok) {
          return;
        }

        const idx = blocks.findIndex((value) => value["slug"] == block.slug);
        blocks[idx] = formatBlock(resp.data);
        blocks = [...blocks];

        _force_render_epoch_store_thing[bid] = (_force_render_epoch_store_thing[bid] || 0) + 1
      },
      onClose: () => {
        modal.close_big();
      },
    });
  };

  const saveMeta = () => {
    service.update_board_meta(key, getMeta());
  };
</script>

<RootLayout
  name="Freeboard"
  actions={{ "↻": load, "+": new_block, "🏠": home, "💾": saveMeta }}
>
  {#if loading}
    <div>Loading</div>
  {:else}
    <BoardInner
      bind:getMeta
      {meta}
      link_start_name={_link_start_name}
      epoch_store={_force_render_epoch_store_thing}
      {blocks}
      links={_links}
      on:new_link_start={(ev) => (_link_start_name = ev.detail)}
      on:new_link_end={(ev) => {
        const from = _link_start_name;
        _link_start_name = null;
        completeLink(from, ev.detail);
      }}
      on:new_link_cancel={(ev) => (_link_start_name = ev.detail)}
      on:edit_block={editBlock}
      on:delete_block={async (ev) => {
        await service.delete_board_block(key, ev.detail);
        load();
      }}
    />
  {/if}
</RootLayout>
