<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Dropdown from "../../common/autotable/_dropdown.svelte";
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

        <Dropdown>
          <svg
            slot="ident"
            class="h-4 fill-current text-gray-dark cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            ><path
              d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"
            /></svg
          >

          <div class="text-xs cursor-pointer flex flex-col">
            <button
              on:click={() => dispatch("edit_group", group)}
              class="p-1 hover:bg-green-500 rounded capitalize text-gray-700"
            >
              <span> Edit Group</span>
            </button>

            <button
              on:click={() => dispatch("delete_group", group)}
              class="p-1 hover:bg-green-500 rounded capitalize text-gray-700"
            >
              <span> Delete Group </span>
            </button>
          </div>
        </Dropdown>
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
              on:click={() => dispatch("edit_task_data")}
            >
              edit
            </button>
          </div>
        {/each}

        <button
          class="mt-3 text-gray-600 hover:bg-gray-100 rounded p-1"
          on:click={() => dispatch("add_card", group)}
        >
          Add a card...
        </button>
      </div>
    </div>
  {/each}
</div>
