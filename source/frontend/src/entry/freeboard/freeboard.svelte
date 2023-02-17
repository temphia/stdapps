<script>
  import Board from "./board/board.svelte";
  import Listings from "./listings.svelte";

  export let blocks;
  export let links;
  export let boards;

  $: __listings = true;
  $: __board = "";

  $: {
    console.log("@LISTINGS", blocks, links, boards);
  }
</script>

{#if __listings}
  <Listings
    {boards}
    onClick={(selected) => {
      __board = selected["name"];
      __listings = false;
    }}
  />
{:else}
  {#key __board}
    <Board
      {blocks}
      {links}
      board_name={__board}
      {boards}
      onBoardChange={(next) => {
        __board = next;
        __listings = false;
      }}
    />
  {/key}
{/if}
