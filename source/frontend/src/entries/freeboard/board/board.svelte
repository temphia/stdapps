<script lang="ts">
  import Renderer from "./renderer.svelte";
  import type { Block, Link } from "../store/boardtypes";
  import Modal from "./_modal.svelte";
  import BlockItem from "./block_item.svelte";
  import { FreeBoardService } from "../store/service";
  import { onMount } from "svelte";

  export let blocks: Block[] = [];
  export let links: Link[] = [];
  export let board_name: string = "";
  export let boards: object[] = [];

  const service = new FreeBoardService();
  const ui_store = service.ui_store;

  $: _link_start_name = $ui_store.link_start_name;

  let modal_close;
  let modal_open;

  onMount(() => {
    service.set_modal(modal_open, modal_close);
  });
</script>

<Modal bind:close={modal_close} bind:open={modal_open} />

<Renderer
  {blocks}
  {board_name}
  {boards}
  {links}
  on:edit_block={(ev) => {

    const block = blocks.filter((f) => f.name === ev.detail)[0];
    if (!block) {
      console.log("@EMPTY_BLOCK")
      return;
    }
    

    modal_open(BlockItem, { block, edit: true });
  }}

  on:board_selected={(ev) => {}}
  
  link_start_name={_link_start_name}
  {service}
/>

<div class="fixed bottom-10 left-10">
  {#if _link_start_name}
    <span class="bg-white rounded"
      >Click on the block you want to link to or cancel.</span
    >
    <button
      on:click={() => service.link_start_clear()}
      class="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="text-white w-6 h-6 inline-block"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  {/if}
</div>
