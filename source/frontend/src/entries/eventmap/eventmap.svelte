<script lang="ts">
  import RootLayout from "../common/root_layout.svelte";
  import Events from "./events/index.svelte";
  import Map from "./map/map.svelte";
</script>

<RootLayout name="Eventmap">
  <div class="flex flex-grow max-h-screen flex-col md:flex-row bg-white">
    <div class="md:w-2/3 md:h-full h-1/2">
      <Map />
    </div>

    <div class="md:w-1/3 md:h-full h-1/2 flex flex-col overflow-auto">
      <Events />
    </div>
  </div>
</RootLayout>
