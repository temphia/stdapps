<script lang="ts">
  import RootLayout from "../../../common/root_layout.svelte";
  import Events from "../../events/index.svelte";
  import Map from "../../map/map.svelte";
  import type { EventmapService } from "../../service";

  export let service: EventmapService;
  export let onReload = () => {};

  const state = service.state;
</script>

<RootLayout
  name="Eventmap"
  actions={{
    "↻": onReload,
    "#️⃣": () => {},
  }}
>
  <div class="flex flex-grow max-h-screen flex-col md:flex-row bg-white">
    <div class="md:w-2/3 md:h-full h-1/2">
      <Map events={$state.events} {service} />
    </div>

    <div class="md:w-1/3 md:h-full h-1/2 flex flex-col overflow-auto">
      <Events
        event_types={$state.event_types}
        events={$state.events}
        {service}
      />
    </div>
  </div>
</RootLayout>
