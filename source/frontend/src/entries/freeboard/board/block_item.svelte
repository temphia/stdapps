<script lang="ts">
  import Card from "./elements/card/card.svelte";
  import Gallery from "./elements/gallary/gallery.svelte";
  import Textbox from "./elements/textbox/textbox.svelte";
  import Todo from "./elements/todo/todo.svelte";
  import { Block, BlockTypeDrawings, Link } from "../service";
  import {
    BlockTypeTextbox,
    BlockTypeTodo,
    BlockTypeGallary,
    BlockTypeCard,
  } from "../service";

  export let block: Block;
  export let edit: boolean;
  export let getValue = undefined;
</script>

{#if block.type === BlockTypeCard}
  <Card {block} {edit} />
{:else if block.type === BlockTypeTodo}
  <Todo {block} {edit} />
{:else if block.type === BlockTypeTextbox}
  <Textbox {block} {edit} bind:getValue />
{:else if block.type === BlockTypeGallary}
  <Gallery {block} {edit} />
{:else if block.type === BlockTypeDrawings}
  <div>Drawings</div>
{:else}
  <div>Not Implemented</div>
{/if}
