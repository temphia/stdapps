<script>
  import StateEdit from "./state_edit.svelte";
  import StateView from "./state_view.svelte";

  export let block;
  export let edit = false;
  export let data = undefined;
</script>

{#if edit}
  <StateEdit {data} />
{:else}
  <StateView {data} />
{/if}
