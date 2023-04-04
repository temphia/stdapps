<script lang="ts">
  import Tailwind from "../../../common/tailwind.svelte";
  import Eventmap from "./eventmap.svelte";
  import { EventmapService } from "../../service";
  export let env: any;

  const service = new EventmapService(env);

  let loading = true;
  let message = "";

  const load = async () => {
    loading = true;
    message = await service.load();
    loading = false;
  };

  load();
</script>

{#if loading}
  <div>Loading..</div>
{:else if message}
  <div class="text-red-500">
    {message}
  </div>
{:else}
  <Eventmap {service} />
{/if}

<Tailwind />
