import type { Environment } from "../../../lib";
import type { DataAPI } from "temphia-frontend/dist/cjs/apiv2/data";
import type { ExecAM } from "temphia-frontend/dist/cjs/exec/exec_am";
import type { Sockd, SockdMessage } from "temphia-frontend/dist/cjs/sockd";

export class EventmapService {
  env: Environment;
  data_api: DataAPI;
  sockd: Sockd;
  constructor(env: Environment) {
    this.env = env;
  }

  load = async () => {
    const resp = await this.env.PreformAction("load", {});
    if (!resp.ok) {
      console.log("resp", resp);
      return;
    }

    const dbtoken = resp.data.data["dbtoken"];
    

    const eam: ExecAM | any = await this.env.GetExecApiManager();

    console.log("@eam", eam);

    this.data_api = eam.new_data_api(dbtoken);
    this.sockd = await eam.new_sockd_room_from_url(
      this.data_api.sockd_url(),
      this.handle_sockd
    );
  };

  handle_sockd = (msg: SockdMessage) => {
    console.log("@sockd_msg", msg);
  };
}
