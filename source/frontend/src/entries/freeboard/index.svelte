<script lang="ts">
  import type { Environment } from "../../lib";
  import FreeboardCompo from "./_freeboard.svelte";
  import { FreeBoard } from "./service";
  import Tailwind from "../common/tailwind.svelte";
  import { setContext } from "svelte";
  import { KEY } from "./service";
  import Modal from "../common/modal.svelte";

  export let env: Environment;

  const service = new FreeBoard(env);
  let loading = true;
  let modal;

  const load = async () => {
    await service.load();
    loading = false;
  };

  setContext(KEY, {
    get_service: () => service,
    get_modal: () => modal,
  });

  load();
</script>

<Modal bind:modal />

{#if loading}
  <div>Loading...</div>
{:else}
  <FreeboardCompo />
{/if}

<Tailwind />
