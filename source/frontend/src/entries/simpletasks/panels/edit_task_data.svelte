<script lang="ts">
  import type { Context, Task, TaskBoard } from "../service";
  import TaskData from "../task_data/task_data.svelte";

  export let board: TaskBoard;
  export let context: Context;
  export let task: Task;
  export let relaodBoard;

</script>

<TaskData {board} {context} {task} {relaodBoard} />
