import { get, Writable } from "svelte/store";
import { writable } from "svelte/store";
import type { Environment } from "../../../lib";
import type { Board, DataSchema, IStore } from "./boardtypes";
import { MemStore } from "./store";

interface UiState {
  link_start_name: string | null;
  loading: boolean;
}

export class FreeBoard {
  env: Environment;
  constructor() {}

  board_service = () => {};
}

export class BoardService {
  backend_provider: IStore;
  schema_store: Writable<DataSchema>;
  ui_store: Writable<UiState>;

  _modal_close: any;
  _modal_open: any;

  constructor() {
    this.backend_provider = new MemStore();
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

  set_modal(_open, _close) {
    this._modal_open = _open;
    this._modal_close = _close;
  }

  async Init() {
    let data = await this.backend_provider.Load();
    this.schema_store.set(data);
  }

  async Save() {
    let data = get(this.schema_store);
    await this.backend_provider.Save(data);
  }

  link_start(name: string) {
    this.ui_store.update((state) => ({ ...state, link_start_name: name }));
  }

  link_start_clear() {
    this.ui_store.update((state) => ({ ...state, link_start_name: null }));
  }

  link_end(name: string) {
    this.ui_store.update((state) => ({ ...state, link_start_name: null }));
  }

  modal_close() {
    this._modal_close();
  }
  modal_open(compo, props) {
    this._modal_open(compo, props);
  }

  AddBoard(board: Board) {
    this.schema_store.update((old) => ({
      ...old,
      boards: [...old.boards, board],
    }));
  }

  UpdateBoard() {}
  DeleteBoard() {}

  AddBlock() {}
  UpdateBlock() {}
  DeleteBlock() {}
}
