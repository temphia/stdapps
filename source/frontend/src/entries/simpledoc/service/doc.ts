import { QuillBinding } from "y-quill";
import { EasyProvider, encodeToBase64, decodeFromBase64 } from "../../common/yjs/easyprovider";
import * as Y from "yjs";
import { generateId } from "../../common/id";
import type { Sockd, SockdMessage } from "temphia-frontend/dist/cjs/sockd";
import type { Environment } from "../../../lib";

type sockd_builder = (callback: (msg: SockdMessage) => void) => Promise<Sockd>;

export class SimpleDocService {
  editor: any;
  sbuilder: sockd_builder;
  env: Environment;

  sockd: Sockd;
  provider: EasyProvider;
  id: string;
  qbind: QuillBinding;

  constructor(env: Environment, sbuilder: sockd_builder, editor: any) {
    this.sbuilder = sbuilder;
    this.editor = editor;
  }

  init = async () => {
    this.sockd = await this.sbuilder(this.handle_sockd_remote);

    const ydoc = new Y.Doc();
    const type = ydoc.getText("quill");

    this.id = generateId();

    this.provider = new EasyProvider(this.id, ydoc, (data) => {
      if (!this.sockd) {
        console.log("@sockd_not_ready");
      }

      this.sockd.SendBroadcast({
        yjs_data: encodeToBase64(data),
      });
    });

    this.qbind = new QuillBinding(type, this.editor, this.provider.awareness);

    this.provider.start();
  };

  private handle_sockd_remote = (msg: SockdMessage) => {
    const ydata = msg.payload["yjs_data"];
    if (!ydata || !this.provider) {
      console.log("@bailing_out", ydata);
      return;
    }

    const ddata = decodeFromBase64(ydata);
    console.log("@applying", ddata, this.id);

    this.provider.handleRemote(ddata);
  };
}
