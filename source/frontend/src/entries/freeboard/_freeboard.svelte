<script lang="ts">
  import { getContext } from "svelte";
  import AutoTable from "../common/autotable/autotable.svelte";
  import RootLayout from "../common/root_layout.svelte";
  import Board from "./board.svelte";
  import NewBoard from "./panels/boards/new_board.svelte";
  import { Context, KEY } from "./service";
  import { formatBoard } from "./service/format";

  const ctx = getContext(KEY) as Context;
  const service = ctx.get_service();
  const modal = ctx.get_modal();

  let boards = [];
  let loading = true;

  let selected = "";

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
        load();
      },
    });
  };
</script>

{#if selected}
  <Board
    onGoBack={() => {
      selected = "";
    }}
    key={selected}
  />
{:else}
  <RootLayout name="Freeboard" actions={{ "↻": load, "+": new_board }}>
    {#if loading}
      <div>Loading</div>
    {:else}
      <AutoTable
        datas={boards}
        actions={[
          {
            Name: "Explore",
            Action: (id) => {
              selected = id;
            },
            Class: "bg-green-400",
            icon: "link",
          },
        ]}
        action_key="key"
        key_names={[
          ["key", "Key"],
          ["name", "Name"],
        ]}
      />
    {/if}
  </RootLayout>
{/if}
