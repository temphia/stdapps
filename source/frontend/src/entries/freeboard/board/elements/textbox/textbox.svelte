<script>
  import StateEdit from "./state_edit.svelte";
  import StateView from "./state_view.svelte";

  export let block;
  export let edit = false;

  let data = block.data || {};
  export let getValue = undefined;
</script>

{#if edit}
  <StateEdit {data} bind:getValue />
{:else}
  <StateView {data} />
{/if}
