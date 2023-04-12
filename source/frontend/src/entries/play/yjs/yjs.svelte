<script lang="ts">
  import { onMount } from "svelte";
  // import type { EventmapService } from "../../service";
  import { startYjsEditor } from "./utils";
  import type { EventmapService } from "../../eventmap/service";
  export let service: EventmapService;

  onMount(() => startYjsEditor("#editor-container", service));
</script>

<svelte:head>
  <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css" />
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css"
  />
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css"
  />
</svelte:head>

<div class="w-full h-full" id="editor-container">am i inside editor</div>
