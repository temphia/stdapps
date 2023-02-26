<script lang="ts">
  export let title = "";
  export let data = [];

  let new_value = "";
  let new_value_done = false;
</script>

<div class="title font-bold text-lg">{title}</div>
<div class="flex items-center text-sm mt-2">
  <input
    type="text"
    bind:value={new_value}
    placeholder="what is your plan for today"
    class=" rounded-sm shadow-sm px-4 py-2 border border-gray-200 w-full mt-4"
  />

  <button
    on:click={() => {
      data = [
        ...data,
        {
          value: new_value,
          done: false,
        },
      ];
    }}
  >
    <svg
      class="w-3 h-3 mr-3 focus:outline-none"
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

<ul class="todo-list mt-4">
  {#each data as item}
    <li class="flex justify-between items-center mt-3">
      <div class="flex items-center">
        <input type="checkbox" checked={item["done"]} disabled />
        <div class="capitalize ml-3 text-sm font-semibold" />
      </div>
      <div>{item["value"] || ""}</div>
    </li>
  {/each}
</ul>
