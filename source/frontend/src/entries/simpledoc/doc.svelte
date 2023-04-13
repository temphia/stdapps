<script lang="ts">
  import RootLayout from "../common/root_layout.svelte";
  import { formatValue } from "../simpletasks/service";
  import QuillEditor from "./_quill_editor.svelte";
  import type { SimpleDocService } from "./service/service";

  export let service: SimpleDocService;
  export let doc_meta;

  export let goBack;

  let data = {};
  let loading = true;

  const load = async () => {
    loading = true
    const resp = await service.doc_api.get_doc_data(doc_meta["slug"]);
    if (!resp.ok) {
      console.log("@err", resp);
      return;
    }

    data = formatValue(resp.data);
    loading = false;
  };

  load();

  const actions = { "↻": load, "💾": () => {}, "🏠": () => { goBack && goBack()} };
</script>

{#if loading}
  <div>loading...</div>
{:else}
  <RootLayout name="Simpledoc [{doc_meta['name']}]" {actions}>
    <QuillEditor {service} doc_data={data} {doc_meta} />
  </RootLayout>
{/if}
