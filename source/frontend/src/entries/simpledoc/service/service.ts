import type { Environment } from "../../../lib";
import { SockdMuxer } from "./muxer";

export class SimpleDocService {
  env: Environment;
  muxer: SockdMuxer;

  constructor(env: Environment) {
    this.env = env;
  }

  load = async () => {
    const resp = await this.env.PreformAction("load", {});
    if (!resp.ok) {
      console.log("@err", resp);
      return false;
    }

    const eam = await this.env.GetExecApiManager();
    this.muxer = new SockdMuxer(
      resp.data["data"]["room_tkt"],
      eam.new_sockd_room
    );

    await this.muxer.init();

    return true;
  };
}
