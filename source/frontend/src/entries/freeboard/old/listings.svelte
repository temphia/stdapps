<script lang="ts">
  import type { Board } from "../service";

  export let boards: Board[] = [];
  export let onClick;
</script>

<div class="w-full">
  <h1
    class="text-2xl sm:text-3xl text-gray-800 dark:text-white font-extrabold tracking-tight p-6"
  >
    Boards
  </h1>
</div>

<div
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full p-8"
>
  {#if boards}
    {#each boards as board}
      <div class="relative mx-auto w-full">
        <div

          on:click={() => {
            onClick(board);
          }}
          class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full"
        >
          <div class="shadow p-4 rounded-lg bg-white">
            <div
              class="flex justify-center relative rounded-lg overflow-hidden h-52"
            >
              <div
                class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full"
              >
                <div class="absolute inset-0 bg-black opacity-10" />
              </div>
            </div>

            <div class="mt-4">
              <h2
                class="font-medium text-base md:text-lg text-gray-800 line-clamp-1"
              >
                {board.name}
              </h2>
              <p class="mt-2 text-sm text-gray-800 line-clamp-1">
                {board.info}
              </p>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <div>Empty</div>
  {/if}
</div>

<div class="fixed bottom-10 right-10">
  <button
    on:click={() => {}}
    class="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
  >
    <svg
      viewBox="0 0 20 20"
      enable-background="new 0 0 20 20"
      class="w-6 h-6 inline-block"
    >
      <path
        fill="#FFFFFF"
        d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                              C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                              C15.952,9,16,9.447,16,10z"
      />
    </svg>
  </button>
</div>
