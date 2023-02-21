<script lang="ts">
  import type { Block } from "../store/boardtypes";
  import BlockItem from "./block_item.svelte";

  export let block: Block;
  export let edit: boolean;
</script>

<BlockItem {block} {edit} />
