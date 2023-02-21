import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import type { AdminPlugStateTktAPI } from "temphia-frontend/dist/cjs/apiv2/admin/plug_state";
import type { Environment } from "../../../lib";
import type { Board, DataSchema } from "./boardtypes";

interface UiState {
  link_start_name: string | null;
  loading: boolean;
}

export class FreeBoard {
  env: Environment;
  pkv_api: AdminPlugStateTktAPI;

  constructor(env: Environment) {
    this.env = env;
  }
  load = async () => {
    const resp = await this.env.PreformAction("load", {});
    if (!resp.ok) {
      return;
    }

    this.pkv_api = this.env.GetRoomTktAPI(resp.data["data"]["state_token"]);
  };

  UpdateBoard() {}
  DeleteBoard() {}
}

export class BoardService {
  parent: FreeBoard;
  schema_store: Writable<DataSchema>;
  ui_store: Writable<UiState>;

  constructor(parent: FreeBoard) {
    this.parent = parent;
    this.schema_store = writable({
      boards: [],
      plug_version: 0,
      schema_version: 0,
    });
    this.ui_store = writable({
      link_start_name: null,
      loading: true,
    });
  }

  async init() {
    //   this.parent.pkv_api.list();
  }

  async save() {}

  link_start(name: string) {
    this.ui_store.update((state) => ({ ...state, link_start_name: name }));
  }

  link_start_clear() {
    this.ui_store.update((state) => ({ ...state, link_start_name: null }));
  }

  link_end(name: string) {
    this.ui_store.update((state) => ({ ...state, link_start_name: null }));
  }

  AddBoard(board: Board) {
    this.schema_store.update((old) => ({
      ...old,
      boards: [...old.boards, board],
    }));
  }

  AddBlock() {}
  UpdateBlock() {}
  DeleteBlock() {}
}
