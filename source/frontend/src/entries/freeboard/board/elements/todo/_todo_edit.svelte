<script lang="ts">
  export let title = "";
  export let data = [];

  let new_value = "";
</script>

<div class="title font-bold text-lg capitalize">{title}</div>
<ul class="todo-list mt-4 p-2 border rounded">
  {#each data as item}
    <li class="flex justify-start items-center mt-3">
      <div class="flex items-center p-1">
        <input type="checkbox" checked={item["done"]} />
      </div>
      <div>{item["value"] || ""}</div>
    </li>
  {/each}
</ul>

<div class="flex items-center text-sm mt-4">
  <input
    type="text"
    bind:value={new_value}
    placeholder="what is your plan for today"
    class=" rounded-sm shadow-sm px-4 py-2 border border-gray-200 w-full"
  />

  <button
    class="p-2 hover:bg-gray-100 rounded"
    on:click={() => {
      data = [
        ...data,
        {
          value: new_value,
          done: false,
        },
      ];
      new_value = ""
    }}
  >
    <svg
      class="w-6 h-6 focus:outline-none"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M12 4v16m8-8H4" />
    </svg>
  </button>
</div>
