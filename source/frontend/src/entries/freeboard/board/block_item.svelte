<script lang="ts">
  import Card from "../elements/card/card.svelte";
  import Gallery from "../elements/gallary/gallery.svelte";
  import Textbox from "../elements/textbox/textbox.svelte";
  import Todo from "../elements/todo/todo.svelte";
  import type { Block, Link } from "../store/boardtypes";

  export let block: Block;
  export let edit: boolean;

  let nested = "";
</script>

{#if block.type === "card"}
  <Card {block} {edit} />
{:else if block.type === "todo"}
  <Todo {block} {edit} />
{:else if block.type === "richtext"}
  <Textbox {block} {edit} />
{:else if block.type === "gallery"}
  <Gallery {block} {edit} />
{:else if block.type === "group"}
  <div>Group</div>
  <!-- {#if edit}
    <div class="flex justify-end">
      <select class="p-1" bind:value={nested}>
        {#each (block["data"] || []) as inner}
          <option>{inner.name}</option>
        {/each}
      </select>
    </div>
  {/if}

  {#each block.data || [] as inner}
    {#if edit}
      {#if nested == inner.name}
        <div class="p-1 border rounded">
          {#if inner.type === "card"}
            <Card {block} {edit} />
          {:else if inner.type === "todo"}
            <Todo {block} {edit} />
          {:else if inner.type === "richtext"}
            <Textbox {block} {edit} />
          {:else if inner.type === "gallery"}
            <Gallery {block} {edit} />
          {/if}
        </div>
      {/if}
    {:else}
      <div class="p-1 border rounded">
        {#if inner.type === "card"}
          <Card {block} {edit} />
        {:else if inner.type === "todo"}
          <Todo {block} {edit} />
        {:else if inner.type === "richtext"}
          <Textbox {block} {edit} />
        {:else if inner.type === "gallery"}
          <Gallery {block} {edit} />
        {/if}
      </div>
    {/if} 
  {/each}
  -->
{/if}
