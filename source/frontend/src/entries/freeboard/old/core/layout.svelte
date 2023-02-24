<script lang="ts">
  import Modal from "./_modal.svelte";
  let modal_close;
  let modal_open;
</script>

<Modal bind:close={modal_close} bind:open={modal_open} />



