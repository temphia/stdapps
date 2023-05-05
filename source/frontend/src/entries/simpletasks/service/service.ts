import type { AdminPlugStateTktAPI } from "@temphia/temphia/dist/cjs/apiv2/admin/plug_state";
import type { Environment } from "../../../lib";

export class TasksService {
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

    const execam = await this.env.GetExecApiManager();
    this.state_api = execam.new_plug_state(data["state_tkt"]);
  };

  // board

  add_board(id: string, data: TaskBoard) {
    return this.state_api.add(id, JSON.stringify(data), {
      tag1: "board",
    });
  }

  update_board(id: string, data: TaskBoard) {
    return this.state_api.update(id, JSON.stringify(data));
  }

  remove_board(id: string) {
    return this.state_api.delete(id);
  }

  get_board(id: string) {
    return this.state_api.get(id);
  }

  list_board() {
    return this.state_api.query({
      tag1s: ["board"],
    });
  }

  // task

  async add_task(bid: string, id: string, data: Task) {
    const resp = await this.state_api.add(id, JSON.stringify(data), {
      tag1: `task-${bid}`,
    });
    if (!resp.ok) {
      return resp;
    }

    const resp1 = await this.state_api.add(`data-${id}`, "{}", {
      tag1: `task_data-${bid}`,
    });

    if (!resp1.ok) {
      console.log("Err creating task_data", resp1);
      return resp1;
    }

    return resp;
  }

  get_task(bid: string, id: string) {
    return this.state_api.get(id);
  }

  update_task(bid: string, id: string, data: Task) {
    return this.state_api.update(id, JSON.stringify(data));
  }

  list_board_task(bid: string) {
    return this.state_api.query({
      tag1s: [`task-${bid}`],
    });
  }

  async remove_task(id: string) {
    // fixme => delete comments
    await this.state_api.delete(`data-${id}`);
    return this.state_api.delete(id);
  }

  get_task_data(bid: string, id: string) {
    return this.state_api.get(`data-${id}`);
  }

  update_task_data(bid: string, id: string, data: TaskData) {
    return this.state_api.update(`data-${id}`, JSON.stringify(data));
  }

  // comments

  list_task_comment(tid: string) {
    return this.state_api.query({
      tag1s: [`comment-${tid}`],
    });
  }

  add_task_comment(tid: string, id: string, data: any) {
    return this.state_api.add(id, JSON.stringify(data), {
      tag1: `comment-${tid}`,
    });
  }

  remove_task_comment(id: string) {
    return this.state_api.delete(id);
  }
}

export interface TaskBoard {
  slug: string;
  name: string;
  info: string;
  groups: TaskGroup[];
}

export interface TaskGroup {
  slug: string;
  name: string;
}

// task state is stored in two place "meta data" in Task and
// actual task data in TaskData

export interface Task {
  slug: string;
  name: string;
  group: string;
  tags: string[];
}

interface TaskData {}
