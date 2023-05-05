<script lang="ts">
  import type { Environment } from "@temphia/temphia/dist/cjs/engine/environment";
  import Tailwind from "../../../common/tailwind.svelte";
  import Emitter from "./emitter.svelte";
  export let env: Environment;

  let loading = true;

  let event_types = [];
  let message = "";
  let final = false;

  const load = async () => {
    loading = true;
    const resp = await env.PreformAction("load", {});
    if (!resp.ok) {
      message = resp.data;
    } else {
      event_types = (resp.data["data"] || {})["event_types"] || [];
    }
    loading = false;
  };

  const emit = async (data) => {
    loading = true;
    const resp = await env.PreformAction("emit", data);
    if (!resp.ok) {
      message = resp.data;
      return;
    }
    final = true
    loading = false;
  };

  load();
</script>

<Tailwind />

<div class="w-full bg-gray-50 py-4 px-1">
  <div
    class="card p-4 text-token border shadow mx-auto my-4 bg-white"
    style="max-width: 750px;"
  >
    {#if loading}
      <p>Loading...</p>
    {:else if message}
      <p class="text-red-500">{message}</p>
    {:else if final}
      <div>
        <h2>Event emited!</h2>
        <button
          on:click={() => {
            message = "";
            final = false;
          }}
          class="text-blue-500 underline">create new</button
        >
      </div>
    {:else}
      <Emitter {event_types} {env} onEmit={emit} />
    {/if}
  </div>
</div>
