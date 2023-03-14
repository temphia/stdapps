<script lang="ts">
  export let onSave: (data: any) => void;

  export let group;
  export let slug;
  export let name = "";

  let message = "";

  const create = () => {
    if (!name) {
      message = "Invalid name";
    }

    message = "";
    onSave({
      group,
      slug,
      name,
    });
  };
</script>

<div class="flex flex-col">
  <div class="text-2xl text-indigo-900 mb-2">Edit Task</div>
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
    Update
  </button>
</div>
