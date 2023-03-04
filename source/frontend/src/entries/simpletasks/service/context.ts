import type { Modal } from "../../common/modal";
import type { TasksService } from "./service";

export const KEY = {};

export interface Context {
  get_service(): TasksService;
  get_modal(): Modal;
}
