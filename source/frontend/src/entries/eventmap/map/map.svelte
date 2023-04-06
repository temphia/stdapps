<script>
  import Renderer from "./renderer/renderer.svelte";
  export let events = [];
  export let service
</script>

<Renderer {events} {service} />
