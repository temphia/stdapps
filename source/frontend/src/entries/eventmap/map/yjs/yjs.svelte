<script lang="ts">
  import { onMount } from "svelte";
  import type { EventmapService } from "../../service";
  import { startYjsEditor } from "./utils";
  export let service: EventmapService;

  onMount(() => startYjsEditor("#editor-container",service));
</script>

<div class="w-full h-full" id="editor-container">am i inside editor</div>
