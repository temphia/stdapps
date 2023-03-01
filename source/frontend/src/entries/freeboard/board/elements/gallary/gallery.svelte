<script>
  import Gallary from "./_gallary.svelte";
  export let block;
  export let edit = false;
</script>

{#if edit}
  <div>Not Implemented</div>
{:else}
  <Gallary />
{/if}
