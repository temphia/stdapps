<script lang="ts">
  import Tailwind from "../common/tailwind.svelte";
  import Eventmap from "./eventmap.svelte";
  import { EventmapService } from "./service";
  export let env: any;

  const service = new EventmapService(env);

  let loading = true;
  const load = async () => {
    loading = true;

    await service.load()

    
  };

  load()
</script>

<Eventmap />

<Tailwind />
