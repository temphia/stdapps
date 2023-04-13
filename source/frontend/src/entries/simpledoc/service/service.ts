import type { AdminPlugStateTktAPI } from "temphia-frontend/dist/cjs/apiv2";
import type { Environment } from "../../../lib";
import { SockdMuxer } from "./muxer";

export class SimpleDocService {
  env: Environment;
  muxer: SockdMuxer;
  doc_api: DocApi;

  constructor(env: Environment) {
    this.env = env;
  }

  load = async () => {
    const resp = await this.env.PreformAction("load", {});
    if (!resp.ok) {
      console.log("@err", resp);
      return false;
    }

    const data = resp.data["data"] || {};

    const eam = await this.env.GetExecApiManager();

    this.muxer = new SockdMuxer(data["room_tkt"], eam.new_sockd_room);

    this.doc_api = new DocApi(this.env, eam.new_plug_state(data["plug_state"]));

    await this.muxer.init();

    return true;
  };
}

export class DocApi {
  env: Environment;
  state_api: AdminPlugStateTktAPI;

  constructor(env: Environment, state_api: AdminPlugStateTktAPI) {
    this.env = env;
    this.state_api = state_api;
  }

  list_docs = () => {
    return this.state_api.query({
      tag1s: ["doc"],
    });
  };

  add_doc = async (id: string, data: any) => {
    const resp = await this.state_api.add(id, JSON.stringify(data), {
      tag1: "doc",
    });
    if (!resp.ok) {
      return resp;
    }

    const resp1 = await this.state_api.add(`${id}-data`, "{}", {
      tag1: "doc-data",
    });
    if (!resp1.ok) {
      console.log("Err creating meta table", resp1);
    }

    return resp;
  };

  remove_doc = async (id: string) => {
    await this.state_api.delete(`${id}-data`);
    return this.state_api.delete(id);
  };

  update_doc = (id: string, data: any) => {
    return this.state_api.update(id, JSON.stringify(data));
  };

  get_doc_data = (id: string) => {
    return this.state_api.get(`${id}-data`);
  };

  update_doc_data = (id: string, data: any) => {
    return this.state_api.update(`${id}-data`, JSON.stringify(data));
  };
}
