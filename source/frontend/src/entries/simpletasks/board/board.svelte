<script lang="ts">
  import type { Task, TaskBoard } from "../service";
  export let board: TaskBoard;
  export let tasks: Task[];
</script>

<div class="flex grow p-4 items-start overflow-x-scroll">
  {#each (board.groups || []) as group}
    <div class="rounded bg-gray-200  flex-shrink-0 w-64 p-2 mr-3">
      <div class="flex justify-between py-1">
        <h3 class="text-sm">{group.name}</h3>
        <svg
          class="h-4 fill-current text-gray-dark cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          ><path
            d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"
          /></svg
        >
      </div>
      <div class="text-sm mt-2">
        <!-- {#each group.items as item}
          <div
            class="bg-white p-2 rounded mt-1 border-b border-gray-800 cursor-pointer hover:bg-gray-200 "
          >
            {item.title}
          </div>
        {/each} -->

        <p class="mt-3 text-gray-dark">Add a card...</p>
      </div>
    </div>
  {/each}
</div>
