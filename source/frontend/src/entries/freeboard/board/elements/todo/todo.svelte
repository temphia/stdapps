<script lang="ts">
  import type { Block } from "../../../service";
  import TodoEdit from "./_todo_edit.svelte";
  import TodoPreview from "./_todo_preview.svelte";

  export let block: Block;
  export let edit = false;
  export let data = undefined;
</script>

{#if edit}
  <TodoEdit {data} title={block.name} />
{:else}
  <TodoPreview {data} title={block.name} />
{/if}
