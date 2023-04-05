<script lang="ts">
  import type { Environment } from "temphia-frontend/dist/cjs/engine/environment";
  import Location from "./_location.svelte";
  export let env: Environment;
  export let event_types = [];
  export let onEmit = (data) => {};

  let getValue;

  let title = "";
  let contents = "";
  let occuredat = new Date();
</script>

<header class=" text-2xl font-bold">New Event</header>
<div class="space-y-4">
  <div class="flex-col flex py-3">
    <label for="" class="pb-2 text-gray-700 font-semibold">Title</label>
    <input
      type="text"
      bind:value={title}
      class="p-2 rounded-lg bg-gray-100 outline-none focus:bg-gray-200"
    />
  </div>

  <div class="flex-col flex py-3">
    <label for="" class="pb-2 text-gray-700 font-semibold">Event Type</label>

    <select class="p-2 rounded-lg bg-gray-100 outline-none focus:bg-gray-200">
      {#each event_types as evt}
        <option value={evt.__id}>{evt.name}</option>
      {/each}
    </select>
  </div>

  <div class="flex-col flex py-3">
    <label for="" class="pb-2 text-gray-700 font-semibold">Contents</label>
    <textarea
      bind:value={contents}
      class="p-2 rounded-lg bg-gray-100 outline-none focus:bg-gray-200"
    />
  </div>

  <div class="flex-col flex py-3">
    <label for="" class="pb-2 text-gray-700 font-semibold">Location</label>
    <Location bind:getValue />
  </div>

  <div class="flex justify-end">
    <button
      on:click={() =>
        onEmit({
          title,
          contents,
          location: getValue(),
          occuredat,
        })}
      class="bg-blue-500 rounded text-white p-1 hover:bg-blue-700"
      >create</button
    >
  </div>
</div>
