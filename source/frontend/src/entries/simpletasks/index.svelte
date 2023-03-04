<script lang="ts">
  import type { Environment } from "../../lib";
  import { TasksService, KEY } from "./service";
  import Tailwind from "../common/tailwind.svelte";
  import { setContext } from "svelte";
  import Tasks from "./_tasks.svelte";

  export let env: Environment;

  const service = new TasksService(env);
  let loading = true;
  let modal;

  const load = async () => {
    await service.load();
    loading = false;
  };

  load();

  setContext(KEY, {
    get_service: () => service,
    get_modal: () => modal,
  });
</script>

{#if loading}
  <div>loading...</div>
{:else}
  <Tasks />
{/if}

<Tailwind />
