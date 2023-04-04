<script>
  import Event from "./event.svelte";
  export let event_types = [];
  export let events = [];
</script>

<div class="p-1 overflow-auto">
  {#each events as evnt}
    <Event contents={evnt.contents} title={evnt.title} />
  {/each}
</div>
