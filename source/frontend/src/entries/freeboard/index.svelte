<script lang="ts">
  import type { Environment } from "../../lib";
  import FreeboardCompo from "./_freeboard.svelte";
  import { FreeBoard } from "./service";

  export let env: Environment;

  const service = new FreeBoard(env);
  let loading = true;

  const load = async () => {
    await service.load();
    loading = false;
  };

  load();
</script>

{#if loading}
  <div>Loading...</div>
{:else}
  <FreeboardCompo {service} />
{/if}
