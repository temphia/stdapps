<script lang="ts">
  export let name = "";
  export let actions: { [_: string]: () => void } = {};
</script>

<div class="bg-blue-400 w-full h-screen font-sans flex flex-col">
  <div class="flex p-2 justify-between bg-blue-600">
    <div class="flex">
      <h3 class="text-white mr-4">{name}</h3>
    </div>

    <div class="flex gap-2">
      {#each Object.entries(actions) as [akey, afunc]}
        <button
          on:click={afunc}
          class="bg-blue-200 hover:bg-blue-500 rounded  font-bold text-white text-sm px-2"
          >{akey}</button
        >
      {/each}
    </div>
  </div>

  <slot />
</div>
