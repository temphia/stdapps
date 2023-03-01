<script lang="ts">
  import Renderer from "./renderer.svelte";
  import type { Block, Link } from "../service";
  import BoardLayout from "./_board_layout.svelte";
  import { createEventDispatcher } from "svelte";

  export let blocks: Block[] = [];
  export let links: Link[] = [];
  export let board_name: string = "";
  export let boards: object[] = [];
  export let link_start_name: string | null;

  const dispatch = createEventDispatcher();

  $: console.log("@links", links);
</script>

<BoardLayout {link_start_name} onClear={() => dispatch("new_link_cancel")}>
  <Renderer
    {blocks}
    {board_name}
    {boards}
    {links}
    on:new_link_start
    on:new_link_end
    on:edit_block
    on:board_selected
    {link_start_name}
  />
</BoardLayout>
