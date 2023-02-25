<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import NewBoard from "./panels/boards/new_board.svelte";
  import { Context, KEY } from "./service";

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  let boards = [];
  let loading = false;

  const load = async () => {
    const resp = await service.list_boards();
    if (!resp.ok) {
      console.log("@resp_err", resp);
      return;
    }

    console.log("@boards", resp.data);
  };

  load();

  const reload = () => {
    console.log("@reload");
  };

  const new_board = () => {
    modal.show_small(NewBoard, {});
  };
</script>

<RootLayout name="Freeboard" actions={{ "↻": reload, "+": new_board }}>
  <div>Todo</div>
</RootLayout>
