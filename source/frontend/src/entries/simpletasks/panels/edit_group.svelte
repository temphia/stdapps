<script lang="ts">
  import type { TaskGroup } from "../service";
  export let group: TaskGroup;

  let name = group.name;

  export let onEdit = (data) => {};
  export let onDelete = () => {};
</script>

<div class="flex flex-col">
  <div class="text-2xl text-indigo-900 mb-2">Edit Task Group</div>

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

  <div class="flex justify-end gap-1">
    <button
      on:click={() => {
        onEdit({ ...group, name });
      }}
      class="p-1 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="button"
    >
      Update
    </button>

    <button
      on:click={onDelete}
      class="p-1 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
      type="button"
    >
      Delete
    </button>
  </div>
</div>
