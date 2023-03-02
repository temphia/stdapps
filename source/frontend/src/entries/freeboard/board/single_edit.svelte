<script lang="ts">
  import type { Block } from "../service";
  import BlockItem from "./block_item.svelte";

  export let block: Block;
  export let edit: boolean;
  export let onUpdate: (bid: string, bdata: any) => Promise<void>;
  export let onClose;

  let getValue = undefined;

  let updateing = false;

  const update = async () => {
    if (!getValue) {
      return;
    }

    updateing = true;
    const _data = getValue();
    await onUpdate(block.slug, _data);
    updateing = false;
  };
</script>

<div class="flex flex-col justify-around h-full">
  <div class="flex-grow">
    <BlockItem {block} {edit} bind:getValue />
  </div>

  <div class="flex justify-end gap-2">
    <button
      class="p-1 rounded bg-blue-400 hover:bg-blue-800 text-white disabled:bg-gray-700"
      on:click={update}
      disabled={updateing}
    >
      Update</button
    >

    <button
      class="p-1 rounded bg-red-50 hover:bg-red-200 text-red-800"
      on:click={onClose}
    >
      Close</button
    >
  </div>
</div>
