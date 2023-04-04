<script>
  export let title;
  export let contents;

  export let onClick = () => {

  }


</script>

<div class="rounded shadow flex flex-col p-2 cursor-pointer">
  <div class="flex items-center justify-between w-full">
    <h2 class="focus:outline-none text-sm leading-none text-indigo-700">
      {title}
    </h2>
  </div>

  <div class="flex justify-between flex-nowrap">
    <p class="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
      {contents}
    </p>

    <div>
      <button on:click={onClick}
        class=" hover:bg-gray-50 rounded font-bold text-gray-700 text-sm p-1"
      >
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      </button>

    </div>
  </div>
</div>
