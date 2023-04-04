<script>
  import { createEventDispatcher } from "svelte";
  import Event from "./event.svelte";
  export let event_types = [];
  export let events = [];

  const dispatch = createEventDispatcher();
</script>

<div class="p-1 overflow-auto">
  {#each events as evnt}
    <Event
      contents={evnt.contents}
      title={evnt.title}
      onClick={() => dispatch("click_event", evnt)}
    />
  {/each}
</div>
