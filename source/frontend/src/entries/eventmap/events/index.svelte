<script lang="ts">
  import Event from "./event.svelte";
  import type { EventmapService } from "../service";
  export let event_types = [];
  export let events = [];
  export let service: EventmapService;
</script>

<div class="p-1 overflow-auto">
  {#each events as evnt}
    <Event
      contents={evnt.contents}
      title={evnt.title}
      onClick={() => {
        if (service.map_utils && evnt.location) {
          const map = service.map_utils.get_map();

          map.panTo(evnt.location);
        }
      }}
    />
  {/each}
</div>
