<script lang="ts">
  import type { Context } from "../service/context";

  export let ctx: Context;
  export let data: any;
  export let slug: string;

  let message = "";

  const service = ctx.get_service();

  let loading = true;
  const doSave = async () => {
    loading = true;

    const resp = await service.doc_api.update_doc_data(slug, data);
    message = resp.data;
    loading = false;
  };

  doSave();
</script>

{#if loading}
  <div>Loading..</div>
{:else}
  <div class="flex justify-center items-center flex-col">
    <p>{typeof message === "object" ? JSON.stringify(message) : message}</p>
    <button
      class="p-1 rounded bg-blue-500 hover:bg-blue-700 text-white"
      on:click={() => {
        ctx.get_modal().close_small();
      }}>close</button
    >
  </div>
{/if}
