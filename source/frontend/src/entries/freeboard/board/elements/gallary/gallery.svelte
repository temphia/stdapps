<script>
  import Gallary from "./_gallary.svelte";
  export let block;
  export let edit = false;
  export let data = undefined;
</script>

{#if edit}
  <div>Not Implemented</div>
{:else}
  <Gallary />
{/if}
