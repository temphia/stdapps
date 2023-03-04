import type Modal from "../../common/modal.svelte";
import type { FreeBoard } from "./service";

export const KEY = {};

export interface Context {
  get_service(): FreeBoard;
  get_modal(): Modal;
}
