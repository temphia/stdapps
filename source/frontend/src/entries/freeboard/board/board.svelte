<script lang="ts">
  import Renderer from "./renderer.svelte";
  import type { Block, Link } from "../service";
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
    on:edit_block
    on:board_selected
    on:edit_block
    {link_start_name}
  />
</BoardLayout>
