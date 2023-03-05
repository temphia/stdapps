<script lang="ts">
  export let onSave: (name: string) => void;

  export let from: string;
  export let to: string;

  let message = "";
  let name = "";

  const create = () => {
    if (!name) {
      message = "Invalid name";
      return;
    }

    onSave(name);
  };
</script>

<div class="flex flex-col">
  <div class="text-2xl text-indigo-900 mb-2">New Link</div>
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
    <label class="block mb-2 text-sm font-bold text-gray-700" for="from">
      From
    </label>
    <input
      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="from"
      type="text"
      value={from}
      disabled
    />
  </div>

  <div class="mb-4">
    <label class="block mb-2 text-sm font-bold text-gray-700" for="to">
      To
    </label>
    <input
      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="to"
      type="text"
      value={to}
      disabled
    />
  </div>

  <button
    on:click={create}
    class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
    type="button"
  >
    Complete
  </button>
</div>
