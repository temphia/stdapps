<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task, TaskBoard, TaskGroup } from "../service";
  import { formatTasks } from "./format_tasks";

  export let board: TaskBoard;
  export let tasks: Task[];

  const dispatch = createEventDispatcher();

  let ptasks = formatTasks(board, tasks);

  let fromGroup;
  let toGroup;
  let moveTask;

  $: console.log("@from/@to |>", fromGroup, toGroup);
</script>

<div class="flex grow p-4 items-start overflow-x-scroll">
  {#each board.groups || [] as group}
    <div
      class="rounded bg-gray-200  flex-shrink-0 w-64 p-2 mr-3 {toGroup ===
      group.slug
        ? 'border-blue-600 border-2'
        : ''}"
      on:dragover={() => {
        console.log("@dragover");
        if (fromGroup === group.slug) {
          toGroup = null;
          return;
        }

        toGroup = group.slug;
      }}
    >
      <div class="flex justify-between py-1">
        <h3 class="text-sm">{group.name}</h3>

        <button class="p-1 hover:bg-gray-100 rounded" on:click={() => dispatch("edit_group", group)}>
          <svg  class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>


      </div>
      <div class="text-sm mt-2">
        {#each ptasks[group.slug] || [] as item}
          <div
            draggable="true"
            on:dragstart={(ev) => {
              fromGroup = group.slug;
              moveTask = item;
              toGroup = null;
            }}
            on:dragend={(ev) => {
              if (toGroup) {
                dispatch("complete_task_group_move", {
                  task: moveTask,
                  from_group: fromGroup,
                  to_group: toGroup,
                });
              }

              fromGroup = null;
              moveTask = null;
              toGroup = null;
            }}
            class="bg-white p-2 rounded mt-1 border-b border-gray-800 hover:bg-gray-200 flex justify-between select-none cursor-move"
          >
            {item.name}

            <button
              class="text-gray-600 hover:bg-gray-100 rounded p-1 text-xs"
              on:click={() => dispatch("edit_task_data", item)}
            >
              edit
            </button>
          </div>
        {/each}

        <button
          class="mt-3 text-gray-600 hover:bg-gray-100 rounded p-1"
          on:click={() => dispatch("add_card", group)}
        >
          Add a task...
        </button>
      </div>
    </div>
  {/each}
</div>
