<script>
  export let docs = [];
  export let onClick = (data) => {};
  export let onEdit = (data) => {};
</script>

<div class="flex gap-2 flex-wrap justify-center p-1">
  {#each docs as doc}
    <div class="shadow p-4 rounded-lg bg-white w-80">
      <div
        class="flex justify-center relative rounded-lg overflow-hidden w-full h-36"
      >
        <div
          class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full"
        >
          <div class="absolute inset-0 bg-black opacity-10" />
        </div>

        <div class="absolute flex justify-center bottom-0 mb-3">
          <div class="flex space-x-5">
            <button
              class="flex items-center font-medium text-gray-800 rounded-lg bg-white px-4 py-1 shadow hover:bg-gray-300"
              on:click={() => onClick(doc)}
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>

              edit
            </button>

            <button
              class="flex items-center font-medium text-gray-800 rounded-lg bg-white px-4 py-1 shadow hover:bg-gray-300"
              on:click={() => onEdit(doc)}
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- <span
          class="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none"
        >
          Featured
        </span> -->
      </div>

      <div class="mt-4">
        <h2
          class="font-medium text-base md:text-lg text-gray-800 line-clamp-1"
          title="New York"
        >
          {doc["name"] || ""}
        </h2>
        <p
          class="mt-2 text-sm text-gray-800 line-clamp-1"
          title="New York, NY 10004, United States"
        >
          {doc["info"] || ""}
        </p>
      </div>
    </div>
  {/each}
</div>
