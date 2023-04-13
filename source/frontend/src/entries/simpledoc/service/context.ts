import type { Modal } from "../../common/modal";
import type { SimpleDocService } from "./service";

export const KEY = {};

export interface Context {
  get_service(): SimpleDocService;
  get_modal(): Modal;
}
