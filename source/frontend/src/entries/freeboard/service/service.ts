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
  state_api: AdminPlugStateTktAPI;

  constructor(env: Environment) {
    this.env = env;
  }
  load = async () => {
    console.log("@load", this)

    const resp = await this.env.PreformAction("load", {});
    if (!resp.ok) {
      return;
    }
    const data = resp.data["data"] || {};
    this.state_api = this.env.GetPlugStateTktAPI(data["state_tkt"]);
  };

  list_boards() {
    return this.state_api.query({
      tag1s: ["board"],
    });
  }

  add_board(id: string, data: any) {
    return this.state_api.add(id, JSON.stringify(data), {
      tag1: "board",
    });
  }

  update_board(id: string, data: any) {
    return this.state_api.update(id, JSON.stringify(data));
  }

  delete_board(id: string) {
    return this.state_api.delete(id);
  }

  list_board_blocks(blockId: string) {
    return this.state_api.query({
      tag1s: [`block-${blockId}`],
    });
  }

  add_board_block(blockId: string, bid: string, data: any) {
    return this.state_api.add(bid, JSON.stringify(data), {
      tag1: `block-${blockId}`,
    });
  }

  update_board_block(blockId: string, bid: string, data: any) {
    return this.state_api.update(bid, JSON.stringify(data));
  }

  delete_board_block(blockId: string, bid: string) {
    return this.state_api.delete(bid);
  }
}

export class BoardService {
  parent: FreeBoard;
  ui_store: Writable<UiState>;

  constructor(parent: FreeBoard) {
    this.parent = parent;
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

  AddBlock() {}
  UpdateBlock() {}
  DeleteBlock() {}
}
