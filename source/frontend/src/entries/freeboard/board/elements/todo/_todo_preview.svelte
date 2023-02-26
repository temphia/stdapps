<script lang="ts">
  export let title = "";
  export let data = [];
</script>

<div class="title font-bold text-lg">{title}</div>

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
