<script lang="ts">
  import type { Context, TaskBoard } from "../service";
  import TaskData from "../task_data/task_data.svelte";

  export let board: TaskBoard;
  export let context: Context;
  export let id: string;
</script>

<TaskData {board} {context} {id} />
