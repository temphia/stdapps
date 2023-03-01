import type { AdminPlugStateTktAPI } from "temphia-frontend/dist/cjs/apiv2/admin/plug_state";
import type { Environment } from "../../../lib";
import type { Board } from "./boardtypes";

export class FreeBoard {
  env: Environment;
  state_api: AdminPlugStateTktAPI;

  constructor(env: Environment) {
    this.env = env;
  }
  load = async () => {
    console.log("@load", this);

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
    // fixme =< also cleanup blocks and other stuff inside board
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