<script lang="ts">
  import type { EventmapService } from "../service";
  import Renderer from "./renderer/renderer.svelte";
  import Yjs from "./yjs/yjs.svelte";

  export let events = [];
  export let service: EventmapService;
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

<div class="w-full h-full">
  <Yjs {service} />
</div>

<!-- <Renderer {events} {service} /> -->
