<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import { Context, formatValue, KEY } from "./service";
  import NewBoard from "./panels/new_board.svelte";
  import Board from "./board.svelte";
  import Listings from "../common/listings/listings.svelte";
  import EditBoard from "./panels/edit_board.svelte";

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  let loading = true;
  let boards = [];
  let current_board = null;

  const load = async () => {
    loading = true;
    const resp = await service.list_board();
    if (!resp.ok) {
      return;
    }
    boards = resp.data.map((v) => formatValue(v));
    loading = false;
  };

  load();

  const new_board = () => {
    modal.show_small(NewBoard, {
      onSave: async (data) => {
        await service.add_board(data["slug"], data);

        modal.close_small();

        load();
      },
    });
  };
</script>

{#if loading}
  <div>loading..</div>
{:else if current_board}
  <Board
    onGoBack={() => {
      current_board = null;
      load();
    }}
    bind:board={current_board}
  />
{:else}
  <RootLayout name="SimpleTasks" actions={{ "↻": load, "+": new_board }}>
    <Listings
      docs={boards}
      onEdit={(_board) => {
        modal.show_small(EditBoard, {});
      }}
      onClick={(_board) => {
        current_board = _board;
      }}
    />
  </RootLayout>
{/if}
