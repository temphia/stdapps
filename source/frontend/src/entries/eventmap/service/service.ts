import type { Environment } from "../../../lib";
import type { DataAPI } from "@temphia/temphia/dist/cjs/apiv2/data";
import type { ExecAM } from "@temphia/temphia/dist/cjs/exec/exec_am";
import {
  MESSAGE_SERVER_PUBLISH,
  Sockd,
  SockdMessage,
} from "@temphia/temphia/dist/cjs/sockd";
import { Writable, writable } from "svelte/store";
import { extractLatLongFromWKT } from "../map/renderer/utils";

export interface State {
  event_types: object[];
  events: object[];
}

export interface MapUtils {
  get_map(): any;
  get_event_layers: any;
}

export class EventmapService {
  env: Environment;
  sockd: Sockd;
  state: Writable<State>;

  map_utils: MapUtils;

  api_service: ApiService;

  fallback_handler: (msg: SockdMessage) => void;

  constructor(env: Environment) {
    this.env = env;
    this.state = writable({
      event_types: [],
      events: [],
    });
  }

  load = async () => {
    const resp = await this.env.PreformAction("load", {});
    if (!resp.ok) {
      return resp.data;
    }

    const dbtoken = resp.data.data["dbtoken"];

    const eam: ExecAM | any = await this.env.GetExecApiManager();

    console.log("@eam", eam);

    const data_api = eam.new_data_api(dbtoken);
    this.sockd = await eam.new_sockd_room_from_url(
      data_api.sockd_url(),
      this.handle_sockd
    );

    this.api_service = new ApiService(data_api);

    const etresp = await this.api_service.load_event_types();
    if (!etresp.ok) {
      return etresp.data;
    }

    const eresp = await this.api_service.load_events();
    if (!eresp.ok) {
      return eresp.data;
    }

    this.state.set({
      event_types: etresp.data["rows"],
      events: eresp.data["rows"],
    });

    return null;
  };

  handle_sockd = (msg: SockdMessage) => {
    if (msg.type !== MESSAGE_SERVER_PUBLISH) {
      if (this.fallback_handler) {
        this.fallback_handler(msg);
      }
      return;
    }

    const table = msg.payload["table"];
    if (table !== "events") {
      return;
    }

    const rows_data: any[] =
      msg.payload["rows"].length == 1
        ? [msg.payload["data"]]
        : msg.payload["data"] || [];

    switch (msg.payload["mod_type"]) {
      case "insert":
        rows_data.forEach((evt) => {
          let location = evt["location"];

          if (!location) {
            return;
          }

          if (typeof location === "string" && location.startsWith("SRID=")) {
            evt["location"] = extractLatLongFromWKT(location);
          }
        });

        this.state.update((old) => ({
          ...old,
          events: [...old.events, ...rows_data],
        }));

        break;

      default:
        break;
    }

    console.log("@sockd_msg", msg);
  };
}

export class ApiService {
  data_api: DataAPI;
  constructor(data_api: DataAPI) {
    this.data_api = data_api;
  }

  load_event_types = () => {
    return this.data_api.simple_query("ettypes", {});
  };

  load_events = () => {
    return this.data_api.simple_query("events", {});
  };
}
