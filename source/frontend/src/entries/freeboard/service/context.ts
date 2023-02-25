import type { FreeBoard } from "./service";

export const KEY = {};

export interface Context {
  get_service(): FreeBoard;
  get_modal(): Modal;
}

export interface Modal {
  show_small(comp: any, options: object): void;
  close_small(): void;

  show_big(comp: any, options: object): void;
  close_big(): void;
}
