<script lang="ts">
  import type { Block } from "../service";
  import BlockItem from "./block_item.svelte";

  export let block: Block;
  export let edit: boolean;
</script>

<BlockItem {block} {edit} />
