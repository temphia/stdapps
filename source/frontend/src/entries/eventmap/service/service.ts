import type { Environment } from "../../../lib";
import type { AdminDataAPI } from "temphia-frontend/dist/cjs/apiv2/admin/data";

export class EventmapService {
  env: Environment;
  data_api: AdminDataAPI;
  constructor(env: Environment) {
    this.env = env;
  }

  load = async () => {
    const resp = await this.env.PreformAction("load", {});
    if (!resp.ok) {
      console.log("resp", resp);
      return;
    }

    const dbtoken = resp.data["dbtoken"];
    const eam = await this.env.GetExecApiManager();
    this.data_api = eam.new_data_api(dbtoken);

    console.log("@service", this)


  };
}
