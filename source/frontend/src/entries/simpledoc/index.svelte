<script lang="ts">
  import { setContext } from "svelte";
  import type { Environment } from "../../lib";
  import RootLayout from "../common/root_layout.svelte";
  import Tailwind from "../common/tailwind.svelte";
  import Doc from "./doc.svelte";
  import Listings from "./listings.svelte";
  import { SimpleDocService } from "./service/service";
  import ModalCompo from "../common/modal.svelte";
  import type { Modal } from "../common/modal";
  import AddDoc from "./panels/add_doc.svelte";
  import { formatValue } from "../simpletasks/service";

  export let env: Environment;

  let service: SimpleDocService;
  let loading = true;
  let selected;
  let modal: Modal;

  let docs = [];

  const load = async () => {
    loading = true;
    service = new SimpleDocService(env);
    if (!(await service.load())) {
      return;
    }

    const resp = await service.doc_api.list_docs();
    if (!resp.ok) {
      return;
    }

    docs = resp.data.map((v) => formatValue(v));
    loading = false;
  };

  const new_doc = () => {
    modal.show_small(AddDoc, {
      onSave: async (data: { slug: string; info: string; name: string }) => {
        loading = true;
        const resp = await service.doc_api.add_doc(data.slug, data);
        if (!resp.ok) {
          console.log("@err", resp);
          return;
        }
        modal.close_small();
        service.doc_api.list_docs();
      },
    });

    loading = true;

    loading = false;
  };

  setContext("__simpledoc__", {
    get_service: () => service,
    get_modal: () => modal,
  });

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

<ModalCompo bind:modal />

{#if loading}
  <div>Loading...</div>
{:else if selected}
  <Doc {service} doc_meta={selected} />
{:else}
  <RootLayout name="Simpledoc" actions={{ "↻": load, "+": new_doc }}>
    <Listings
      {docs}
      onClick={(_doc) => {
        selected = _doc;
      }}
    />
  </RootLayout>
{/if}

<Tailwind />
