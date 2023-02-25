<script lang="ts">
  import type { FreeBoard } from "./service";
  export let service: FreeBoard;
  
  let boards = []
  let loading = false

  const load = async () => {
    const resp = await service.list_boards();
    if (!resp.ok) {
      console.log("@resp_err", resp)
      return;
    }



    console.log("@boards", resp.data)
  };

  load()
</script>
