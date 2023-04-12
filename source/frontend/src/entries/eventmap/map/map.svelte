<script lang="ts">
  import type { EventmapService } from "../service";
  import Renderer from "./renderer/renderer.svelte";

  export let events = [];
  export let service: EventmapService;
</script>

<Renderer {events} {service} />
