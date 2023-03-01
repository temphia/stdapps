<script>
  import Card from "./_card.svelte";
  export let block;
  export let edit = false;
</script>

{#if edit}
  <div>Not Implemented</div>
{:else}
  <Card />
{/if}
