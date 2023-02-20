<script>
  import Card from "./_card.svelte";
  export let block;
  export let edit = false;
  export let data = undefined;
</script>

{#if edit}
  <div>Not Implemented</div>
{:else}
  <Card />
{/if}
