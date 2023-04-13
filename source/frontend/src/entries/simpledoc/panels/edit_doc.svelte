<script lang="ts">
  export let name = "";
  export let info = "";
  let message = "";

  const create = () => {
    if (!name) {
      message = "Invalid name";
    }

    message = "";
  };
</script>

<div class="flex flex-col">
  <div class="text-2xl text-indigo-900 mb-2">Edit Document</div>
  <p class="text-red-500">{message}</p>

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

  <div class="mb-4">
    <label class="block mb-2 text-sm font-bold text-gray-700" for="info">
      Info
    </label>
    <textarea
      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="info"
      bind:value={info}
      placeholder="Information about the board..."
    />
  </div>

  <div class="flex justify-end gap-1">
    <button
      on:click={create}
      class="p-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
    >
      update
    </button>

    <button
      class="p-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
    >
      delete
    </button>
  </div>
</div>
