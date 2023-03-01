<script lang="ts">
  import { Block, BoardTypes } from "../../service/boardtypes";
  import { generateId } from "../../service/id";

  export let onSave: (data: Block) => void;

  let slug = generateId();
  let name = "";
  let message = "";
  let type = "textbox";

  const create = () => {
    if (!name) {
      message = "Invalid name";
    }

    message = "";
    onSave({
      data: null,
      links: [],
      name,
      slug,
      type,
    });
  };
</script>

<div class="flex flex-col">
  <p class="text-red-500">{message}</p>

  <div class="mb-4">
    <label class="block mb-2 text-sm font-bold text-gray-700" for="slug">
      Slug
    </label>
    <input
      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="slug"
      type="text"
      value={slug}
      disabled
    />
  </div>

  <div class="mb-4">
    <label class="block mb-2 text-sm font-bold text-gray-700" for="type">
      Type
    </label>

    <select
      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="type"
      bind:value={type}
    >
      {#each BoardTypes as bt}
        <option class="capitalize" value={bt}>{bt}</option>
      {/each}
    </select>
  </div>

  <div class="mb-4">
    <label class="block mb-2 text-sm font-bold text-gray-700" for="name">
      Name
    </label>
    <input
      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="name"
      type="text"
      bind:value={name}
      placeholder="name"
    />
  </div>

  <button
    on:click={create}
    class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
    type="button"
  >
    Create
  </button>
</div>
