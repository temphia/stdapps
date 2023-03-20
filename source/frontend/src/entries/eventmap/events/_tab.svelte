<script lang="ts">
  import Icon from "@krowten/svelte-heroicons/Icon.svelte";

  export let name;
  export let options = [];
  export let onClick = (opt) => {};
  export let onActivate = () => {};
  export let current = false;

  $: __active = false;

  $: if (!current) {
    __active = false;
  }
</script>

<div
  class="py-2 px-2 text-gray-500 flex hover:text-blue-500 cursor-pointer focus:outline-none relative {current
    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
    : ''}"
>
  <button
    class="flex items-center"
    on:click={() => {
      if (current) {
        __active = !__active;
      } else {
        __active = false;
        onActivate();
      }
    }}
  >
    {name} &nbsp;&nbsp;

    {#if current}
      <Icon name="chevron-down" solid class="w-6 h-6 mt-2" />
    {/if}
  </button>

  {#if __active}
    <div
      class="absolute z-50 -right-4 top-8 py-2 bg-white rounded shadow dark:bg-gray-800 w-36 transition-all ease-out duration-500"
    >
      {#each options as opt}
        <button
          on:click={() => {
            __active = false;
            onClick(opt);
          }}
          class="block py-2 w-full text-sm text-gray-600 transition-colors duration-200 transform hover:bg-blue-200"
        >
          {opt}
        </button>
      {/each}
    </div>
  {/if}
</div>
