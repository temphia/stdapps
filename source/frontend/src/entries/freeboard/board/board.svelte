<script lang="ts">
  import Renderer from "./renderer.svelte";
  import type { Block, Link } from "../service";
  import BoardLayout from "./_board_layout.svelte";
  import { createEventDispatcher } from "svelte";

  export let blocks: Block[] = [];
  export let links: Link[] = [];
  export let link_start_name: string | null;

  const dispatch = createEventDispatcher();

  $: console.log("|> @links", links);
  $: console.log("|> @blocks", blocks);
</script>

<BoardLayout {link_start_name} onClear={() => dispatch("new_link_cancel")}>
  <Renderer
    {blocks}
    {links}
    on:new_link_start
    on:new_link_end
    on:edit_block
    on:board_selected
    on:delete_block
    {link_start_name}
  />
</BoardLayout>
