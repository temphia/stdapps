<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import { formatValue } from "../simpletasks/service";
  import QuillEditor from "./_quill_editor.svelte";
  import { Context, KEY } from "./service";
  import SaveDoc from "./panels/save_doc.svelte";

  export let doc_meta;
  export let goBack;

  const ctx = getContext(KEY) as Context;
  let service = ctx.get_service();

  let data = {};
  let loading = true;
  let editor;

  const load = async () => {
    loading = true;
    const resp = await service.doc_api.get_doc_data(doc_meta["slug"]);
    if (!resp.ok) {
      console.log("@err", resp);
      return;
    }

    data = formatValue(resp.data);
    loading = false;
  };

  const save = () => {
    const contents = editor.getContents();
    ctx.get_modal().show_small(SaveDoc, {
      ctx,
      data: { ...data, contents },
      slug: doc_meta["slug"],
    });
  };

  load();

  const actions = {
    "↻": load,
    "💾": save,
    "🏠": () => {
      goBack && goBack();
    },
  };
</script>

{#if loading}
  <div>loading...</div>
{:else}
  <RootLayout name="Simpledoc [{doc_meta['name']}]" {actions}>
    <QuillEditor {service} doc_data={data} {doc_meta} bind:editor />
  </RootLayout>
{/if}
