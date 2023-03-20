import type { Environment } from "../../../lib";

export class EventmapService {
  env: Environment;
  constructor(env: Environment) {
    this.env = env;
  }

  load = async () => {
    const resp = await this.env.PreformAction("load", {});
    if (!resp.ok) {
      console.log("resp", resp);
      return;
    }
    const data = resp.data["data"] || {};
  };
}
