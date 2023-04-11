<script>
  let range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<div class="flex flex-col md:flex-row bg-white h-full" style="max-height: 100vh;">
  <div class="md:w-1/2 md:h-full h-1/2 bg-slate-100 overflow-auto grow-0">
    {#each range as r}
      <div class="h-6 w-full bg-gray-600" />
      <div class="h-24 min-w-full flex justify-end">
        <div class="w-6 h-full bg-gray-600" />
      </div>
      <div class="h-6 w-full bg-gray-600" />
      <div class="h-24 min-w-full flex justify-start">
        <div class="w-6 h-full bg-gray-600" />
      </div>
    {/each}
  </div>

  <div class="md:w-1/2 md:h-full flex-grow h-1/2 overflow-auto bg-yellow-50">
    <div>Todo</div>
  </div>
</div>
