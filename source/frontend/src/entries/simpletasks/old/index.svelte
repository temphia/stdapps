<script lang="ts">
  import { setContext } from "svelte";
  import { Writable, writable } from "svelte/store";
  import Tasks from "./_tasks.svelte";
  import sdata from "./static_data";
  import type { TaskState } from "./task_types";

  let show_big;
  let close_big;
  let show_small;
  let close_small;

  setContext("__modal__", {
    show_big,
    close_big,
    show_small,
    close_small,
  });

  let state: Writable<TaskState> = writable(sdata);
</script>

<Tasks {state} />
