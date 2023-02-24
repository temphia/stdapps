<script lang="ts">
  import type { FreeBoard } from "./service";
  export let service: FreeBoard;
  
  let boards = []
  let loading = false

  const load = async () => {
    const resp = await service.list_boards();
    if (!resp.ok) {
      return;
    }
  };

  load()


</script>
