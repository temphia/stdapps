<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import { Context, KEY } from "./service";

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  let loading = true;
  let boards = [];

  const load = async () => {
    const resp = await service.list_board();
    if (!resp.ok) {
      return;
    }
    console.log("@boards", resp.data);
  };

  load();

  const new_board = () => {

    
  };
</script>

<RootLayout name="SimpleTasks" actions={{ "↻": load, "+": new_board }}>
  <div />
</RootLayout>
