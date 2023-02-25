<script lang="ts">
  import type { Block } from "../../service/boardtypes";

  export let onSave: (data: Block) => void;

  const validateSlug = (v: string) => /^[a-z](-?[a-z])*$/.test(v);

  let slug = "";
  let name = "";
  let message = "";
  let type = "textbox";

  const create = () => {
    if (!validateSlug(slug)) {
      message = "Invalid slug";
    }

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
      bind:value={slug}
      placeholder="Slug"
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
      <option value="textbox">Textbox</option>
      <option value="todo">Todo</option>
      <option value="gallary">Gallary</option>
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
