<script lang="ts">
  import type { Context, TaskBoard } from "../service";
  import Task from "../task/task.svelte";

  export let board: TaskBoard;
  export let context: Context;
  export let id: string;
</script>

<Task />
