import type { Sockd, SockdMessage } from "temphia-frontend/dist/cjs/sockd";

export type sockd_builder = (
  ticket: string,
  callback: (msg: SockdMessage) => void
) => Promise<Sockd>;

export interface DocMessage {
  type: string;
  docid: string;
  yjs_data: string;
}

export class SockdMuxer {
  sockd: Sockd;
  ticket: string;
  builder: sockd_builder;
  active: boolean;

  subs: Map<string, (msg: DocMessage) => void>;

  constructor(ticket: string, builder: sockd_builder) {
    this.ticket = ticket;
    this.builder = builder;
    this.subs = new Map();
    this.active = false;
  }

  init = async () => {
    this.sockd = await this.builder(this.ticket, this.handle);
    this.active = true;
  };

  send_yjs_message = (docid: string, yjs_data: string) => {
    this.sockd.SendBroadcast({
      yjs_data,
      docid,
      type: "yjs",
    });
  };

  add_callback = (docid: string, cb: (msg: DocMessage) => void): void => {
    this.subs.set(docid, cb);
  };

  remove_callback = (docid: string): void => {
    this.subs.delete(docid);
  };

  private handle = (msg: SockdMessage) => {
    const inner = msg.payload as DocMessage;

    switch (inner.type) {
      case "yjs":
        const handler = this.subs.get(inner.docid);
        if (handler) {
          handler(inner);
        }
        break;
      default:
        break;
    }
  };
}
