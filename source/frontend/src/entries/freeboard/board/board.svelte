<script lang="ts">
  import Renderer from "./renderer.svelte";
  import type { Block, Link } from "../store/boardtypes";
  import BoardLayout from "./_board_layout.svelte";

  export let blocks: Block[] = [];
  export let links: Link[] = [];
  export let board_name: string = "";
  export let boards: object[] = [];
  export let link_start_name: string | null;
</script>

<BoardLayout {link_start_name} onClear={() => {}}>
  <Renderer
    {blocks}
    {board_name}
    {boards}
    {links}
    on:edit_block={(ev) => {
      const block = blocks.filter((f) => f.name === ev.detail)[0];
      if (!block) {
        console.log("@EMPTY_BLOCK");
        return;
      }
    }}
    on:board_selected={(ev) => {}}
    {link_start_name}
  />
</BoardLayout>
