<script lang="ts">
  import { getContext } from "svelte";
  import AutoTable from "../common/autotable/autotable.svelte";
  import RootLayout from "../common/root_layout.svelte";
  import Board from "./board.svelte";
  import NewBoard from "./panels/new_board.svelte";
  import { Context, KEY } from "./service";
  import { formatBoard } from "./service/format";

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
      <AutoTable
        datas={boards}
        actions={[
          {
            Name: "Explore",
            Action: (id, data) => {
              selectd_board = data;
              selected = id;
            },
            Class: "bg-green-400",
            icon: "link",
          },

          {
            Name: "Delete",
            Action: async (id) => {
              await service.delete_board(id)
              load()
            },
            Class: "bg-red-400",
            icon: "trash",
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
