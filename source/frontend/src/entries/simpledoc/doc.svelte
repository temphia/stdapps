<script lang="ts">
  import { formatValue } from "../simpletasks/service";
  import QuillEditor from "./_quill_editor.svelte";
  import type { SimpleDocService } from "./service/service";

  export let service: SimpleDocService;
  export let slug: string;

  let data = {};
  let loading = true;

  const load = async () => {
    const resp = await service.doc_api.get_doc_data(slug);
    if (!resp.ok) {
      console.log("@err", resp);
      return;
    }

    data = formatValue(resp.data);
    loading = false;
  };

  load();
</script>

{#if loading}
  <div>loading...</div>
{:else}
  <QuillEditor {service} {data} />
{/if}
