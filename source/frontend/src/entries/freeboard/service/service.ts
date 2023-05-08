import type { AdminPlugStateTktAPI } from "@temphia/temphia/dist/cjs/apiv2/admin/plug_state";
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
    const data = resp["data"] || {};

    const execam = await this.env.GetExecApiManager();
    this.state_api = execam.new_plug_state(data["state_tkt"]);
  };

  list_boards() {
    return this.state_api.query({
      tag1s: ["board"],
    });
  }

  async add_board(id: string, data: any) {
    const resp = await this.state_api.add(id, JSON.stringify(data), {
      tag1: "board",
    });
    if (!resp.ok) {
      return resp;
    }

    const resp1 = await this.state_api.add(`${id}-meta`, "{}", {
      tag1: "board-meta",
    });
    if (!resp1.ok) {
      console.log("Err creating meta table", resp1);
    }

    return resp;
  }

  update_board(id: string, data: any) {
    return this.state_api.update(id, JSON.stringify(data));
  }

  async delete_board(id: string) {
    // fixme =< also cleanup blocks and other stuff inside board
    await this.state_api.delete(`${id}-meta`);
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

  get_board_block(blockId: string, bid: string) {
    return this.state_api.get(bid);
  }

  update_board_block(blockId: string, bid: string, data: any) {
    return this.state_api.update(bid, JSON.stringify(data));
  }

  delete_board_block(blockId: string, bid: string) {
    return this.state_api.delete(bid);
  }

  // meta

  get_board_meta(blockId: string) {
    return this.state_api.get(`${blockId}-meta`);
  }

  async update_board_meta(blockId: string, data: any) {
    const req = JSON.stringify(data);
    const resp = await this.state_api.update(`${blockId}-meta`, req);
    if (resp.ok) {
      return resp;
    }
    const resp1 = await this.state_api.add(`${blockId}-meta`, req);
    if (resp1.ok) {
      return resp1;
    }

    return resp;
  }
}
