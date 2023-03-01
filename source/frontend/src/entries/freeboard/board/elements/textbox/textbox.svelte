<script>
  import StateEdit from "./state_edit.svelte";
  import StateView from "./state_view.svelte";

  export let block;
  export let edit = false;
  let data = block.data || "";
</script>

{#if edit}
  <StateEdit {data} />
{:else}
  <StateView {data} />
{/if}
