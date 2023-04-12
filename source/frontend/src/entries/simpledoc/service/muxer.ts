import type { SockdMessage } from "temphia-frontend/dist/cjs/sockd";

export interface Muxer {
  add_callback(docid: string, cb: (msg: SockdMessage) => void): void;
  remove_callback(docid: string): void;
}
