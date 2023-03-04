<script lang="ts">
  import { getContext } from "svelte";
  import RootLayout from "../common/root_layout.svelte";
  import { Context, formatValue, KEY } from "./service";
  import NewBoard from "./panels/new_board.svelte";
  import Autotable from "../common/autotable/autotable.svelte";
  import Board from "./board.svelte";

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
        const resp = await service.add_board(data["slug"], data);
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
    }}
    board={current_board}
  />
{:else}
  <RootLayout name="SimpleTasks" actions={{ "↻": load, "+": new_board }}>
    <Autotable
      datas={boards}
      actions={[
        {
          Name: "Explore",
          Action: (id, data) => {
            current_board = data;
          },
          Class: "bg-green-400",
          icon: "link",
        },

        {
          Name: "Delete",
          Action: async (id) => {
            await service.remove_board(id);
            load();
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
  </RootLayout>
{/if}
