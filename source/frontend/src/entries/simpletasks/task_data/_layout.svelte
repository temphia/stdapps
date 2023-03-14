<script lang="ts">
  export let edit = true;
  export let comment = 0;

  export let onDelete = () => {};
  export let onUpdate = () => {};
  export let onClose = () => {};
  export let onEditMeta = () => {};
</script>

<div class="h-full flex flex-col max-h-screen">
  <div class="flex justify-between border">
    <nav class="flex flex-row h-10 flex-shrink-0">
      <button
        on:click={() => {
          edit = true;
        }}
        class="text-gray-600 p-1 block hover:text-blue-500 focus:outline-none {edit
          ? 'text-blue-500 border-b-2 font-medium border-blue-500 inline-flex'
          : ''}">Task Edit</button
      >

      <button
        on:click={() => {
          edit = false;
        }}
        class="text-gray-600 p-1 block hover:text-blue-500 focus:outline-none {!edit
          ? 'text-blue-500 border-b-2 font-medium border-blue-500 inline-flex'
          : ''}">Comments [{comment}]</button
      >
    </nav>

    <div class="flex justify-end gap-1 justify-self-center p-2">
      <button
        on:click={onEditMeta}
        class="p-1 text-sm rounded text-white  bg-blue-400 hover:bg-blue-600"
        >edit meta</button
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
