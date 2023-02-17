<script>
  import Todo from "./_todo.svelte";

  export let block;
  export let edit = false;
  export let data = undefined;
</script>

{#if edit}
  <div>Not Implemented</div>
{:else}
  <Todo />
{/if}
