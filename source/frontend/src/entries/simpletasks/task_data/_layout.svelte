<script lang="ts">
  export let edit = true;
  export let comment = 0;

  export let onDelete = () => {};
  export let onUpdate = () => {};
  export let onClose = () => {};
  export let onEditMeta = () => {};
</script>

<div class="h-full flex flex-col max-h-screen">
  <div class="flex justify-between">
    <nav class="flex flex-row h-10 flex-shrink-0">
      <button
        on:click={() => {
          edit = true;
        }}
        class="text-gray-600 p-1 block hover:text-blue-500 focus:outline-none {edit
          ? 'text-blue-500 font-medium border-blue-500 border-b-2'
          : ''}">Task Edit</button
      >

      <button
        on:click={() => {
          edit = false;
        }}
        class="text-gray-600 p-1 block hover:text-blue-500 focus:outline-none {!edit
          ? 'text-blue-500 font-medium border-blue-500 border-b-2'
          : ''}">Comments [{comment}]</button
      >
    </nav>

    <div class="flex justify-end gap-1 justify-self-center p-2 ">
      <button
        on:click={onEditMeta}
        class="p-1 bg-white rounded hover:bg-gray-400"
        >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>

        </button
      >
    </div>
  </div>

  <div class="overflow-auto grow">
    <slot />
  </div>

  {#if edit}
    <div class="flex justify-end gap-1 pt-1">
      <button
        on:click={onDelete}
        class="p-1 text-sm rounded text-white  bg-red-400 hover:bg-red-600"
        >delete</button
      >
      <button
        on:click={onUpdate}
        class="p-1 text-sm rounded text-white  bg-green-400 hover:bg-green-600"
        >update</button
      >

      <button
        on:click={onClose}
        class="p-1 text-sm rounded text-white  bg-blue-400 hover:bg-blue-600"
        >close</button
      >
    </div>
  {/if}
</div>
