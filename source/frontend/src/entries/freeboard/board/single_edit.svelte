<script lang="ts">
  import type { Block } from "../service";
  import BlockItem from "./block_item.svelte";

  export let block: Block;
  export let edit: boolean;
</script>

<div class="flex flex-col justify-around h-full">
  <div class="flex-grow">
    <BlockItem {block} {edit} />
  </div>

  <div class="flex justify-end">
    <button class="p-1 rounded bg-blue-400 hover:bg-blue-800 text-white">
      Update</button
    >
  </div>
</div>
