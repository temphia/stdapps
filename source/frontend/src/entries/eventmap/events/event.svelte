<script>
  export let title;
  export let contents;
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
      <button
        class="bg-blue-50 hover:bg-gray-500 rounded  font-bold text-gray-700 text-sm px-2"
      >
        🔺
      </button>
      <button
        class="bg-blue-50 hover:bg-gray-500 rounded  font-bold text-gray-700 text-sm px-2"
      >
        🟦
      </button>
    </div>
  </div>
</div>
