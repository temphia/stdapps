<script lang="ts">
  export let link_start_name: string | null;
  export let onClear = () => {};
</script>

<slot />

{#if link_start_name}
  <div class="fixed bottom-10 bg-yellow-400 rounded-lg p-1 left-1/2 -translate-x-1/2">
    <span class="text-gray-600"
      >Click on the block you want to link to or cancel.</span
    >
    <button
      on:click={onClear}
      class="p-0 w-8 h-8 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
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
  </div>
{/if}
