<script>
  const lists = [1, 2, 3, 4];
</script>

<div class="flex gap-2 flex-wrap justify-center">
  {#each lists as list}
    <div class="shadow p-4 rounded-lg bg-white w-84">
      <div
        class="flex justify-center relative rounded-lg overflow-hidden w-full h-36"
      >
        <div
          class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full"
        >
          <div class="absolute inset-0 bg-black opacity-10" />
        </div>

        <div class="absolute flex justify-center bottom-0 mb-3">
          <div
            class="flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow hover:bg-gray-300"
          >
            <button class="flex items-center font-medium text-gray-800 ">
              <svg class="w-5 h-5 fill-current mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>

              edit
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
          Statue of Liberty
        </h2>
        <p
          class="mt-2 text-sm text-gray-800 line-clamp-1"
          title="New York, NY 10004, United States"
        >
          New York, NY 10004, United States
        </p>
      </div>
    </div>
  {/each}
</div>
