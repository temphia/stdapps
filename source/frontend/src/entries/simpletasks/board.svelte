<script lang="ts">
  import type { TaskBoard } from "./service";
  export let onGoBack;
  export let board: TaskBoard;
</script>

<div>{board.name}</div>
<p>{board.info}</p>
