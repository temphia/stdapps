<script lang="ts">
  import type { Environment } from "../../lib";
  import Tailwind from "../common/tailwind.svelte";
  import Doc from "./doc.svelte";
  import Listings from "./listings.svelte";
  import { SimpleDocService } from "./service/service";

  export let env: Environment;

  let service: SimpleDocService;
  let loading = true;

  const load = async () => {
    service = new SimpleDocService(env);
    if (await service.load()) {
      loading = false;
    }
  };

  load();
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

<!-- {#if loading}
  <div>Loading...</div>
{:else}
  <Doc {service} />
{/if} -->

<Listings />

<Tailwind />
