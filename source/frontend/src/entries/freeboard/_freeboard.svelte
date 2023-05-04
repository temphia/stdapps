<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import Board from "./board.svelte";
  import NewBoard from "./panels/new_board.svelte";
  import { Context, KEY } from "./service";
  import { formatBoard } from "./service/format";
  import SimpleCard from "../common/simple_card.svelte";

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  let boards = [];
  let loading = true;

  let selected = "";
  let selectd_board = null;

  const load = async () => {
    loading = true;
    const resp = await service.list_boards();
    if (!resp.ok) {
      console.log("@resp_err", resp);
      return;
    }

    boards = resp.data.map((v) => formatBoard(v));
    loading = false;
  };

  load();

  const new_board = () => {
    modal.show_small(NewBoard, {
      onSave: async (data) => {
        await service.add_board(data["slug"], {
          name: data["name"],
        });

        modal.close_small();

        load();
      },
    });
  };
</script>

{#if selected}
  <Board
    onGoBack={() => {
      selectd_board = null;
      selected = "";
    }}
    key={selected}
    board={selectd_board}
  />
{:else}
  <RootLayout name="Freeboard" actions={{ "↻": load, "+": new_board }}>
    {#if loading}
      <div>Loading</div>
    {:else}
      <div class="flex gap-2 flex-wrap justify-center p-1">
        {#each boards as board}
          <SimpleCard
            info=""
            name={board["name"]}
            on:card_click={() => {

              console.log("@@@@", board)
              selected = board["key"];
              selectd_board = board;
            }}
          />
        {/each}
      </div>
    {/if}
  </RootLayout>
{/if}
