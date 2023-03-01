<script lang="ts">
  import Draggable from "./draggable.svelte";
  import type { Block, Link } from "../service";
  import BlockItem from "./block_item.svelte";
  import { createEventDispatcher } from "svelte";
  import { calculateLink } from "./calculate";

  export let blocks: Block[] = [];
  export let links: Link[] = [];
  export let board_name: string = "";
  export let boards: object[] = [];
  export let link_start_name: string | null;

  $: __block_pos = {};
  $: _zoom_level = 1;

</script>

<div class="h-screen w-screen overflow-auto">
  <div class="fixed z-50 bottom-8 md:bottom-1 right-5 p-1">
    <div class="flex gap-1 p-0.5 text-xs bg-gray-100 rounded">
      <button
        class="p-1 rounded text-white bg-gray-600 hover:bg-blue-600"
        on:click={() => {
          if (_zoom_level < 0.2) {
            return;
          }
          _zoom_level = _zoom_level - 0.1;
        }}>-</button
      >
      <button
        class="p-1 rounded text-white bg-gray-600"
        on:click={() => (_zoom_level = 1)}
      >
        {(_zoom_level * 100).toFixed(0)}%
      </button>

      <button
        class="p-1 rounded text-white bg-gray-600 hover:bg-blue-600"
        on:click={() => {
          if (_zoom_level > 3) {
            return;
          }
          _zoom_level = _zoom_level + 0.1;
        }}>+</button
      >
    </div>
  </div>

  <div
    class="relative w-full h-full overflow-auto m-1"
    style="min-width:5000px; min-height:5000px; transform: scale({_zoom_level}); 
      transform-origin: 0% 0% 0px;
      background-image: radial-gradient(rgba(15, 15, 16, 0.33) 1px, transparent 1px); 
            background-size: 13px 13px; background-color: rgba(71, 211, 255, 0.06);
      "
  >
    {#each blocks as block}
      <Draggable
        {link_start_name}
        name={block.name}
        on:card_pos={(ev) => {
          __block_pos[ev.detail["name"]] = ev.detail;
          __block_pos = __block_pos;
        }}
        on:edit_block

        on:new_link_start
        on:new_link_end

      >
        <BlockItem {block} edit={false} />
      </Draggable>
    {/each}

    {#each links as link}
      {@const pos = calculateLink(__block_pos[link.to], __block_pos[link.from])}

      {#if pos}
        <div
          class="h-1 z-10 absolute bg-gray-500 hover:bg-gray-700"
          style="top: {pos[0]}px; left: {pos[1]}px; width:{pos[2]}px; transform-origin: 0 0; transform:rotate({pos[3]}deg) ;"
        />

        {#if link["weighted"]}
          <div
            class="z-10 mr-5 p-1 absolute bg-blue-600 hover:bg-blue-700 text-white rounded"
            style="top: {pos[6]}px; left: {pos[7]}px;"
          >
            {link.name}
          </div>
        {:else}
          <div
            class="z-10 mr-5 p-1 absolute bg-gray-600 hover:bg-gray-700 text-white rounded"
            style="top: {pos[4]}px; left: {pos[5]}px;"
          >
            {link.name}
          </div>
        {/if}
      {/if}
    {/each}
  </div>
</div>
