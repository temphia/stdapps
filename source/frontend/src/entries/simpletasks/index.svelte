<script lang="ts">
  import type { Environment } from "../../lib";
  import { TasksService } from "./service";
  import OldTasks from "./old/index.svelte";
  import Tailwind from "../common/tailwind.svelte";

  export let env: Environment;
</script>

<OldTasks />

<Tailwind />


<div class="hidden bg-green-400"></div>