import { QuillBinding } from "y-quill";
import {
  EasyProvider,
  encodeToBase64,
  decodeFromBase64,
} from "../../common/yjs/easyprovider";
import * as Y from "yjs";
import { generateId } from "../../common/id";
import type { Environment } from "../../../lib";
import type { DocMessage, SockdMuxer } from "./muxer";

export class Document {
  editor: any;
  env: Environment;

  muxer: SockdMuxer;
  provider: EasyProvider;
  id: string;
  qbind: QuillBinding;

  constructor(editor: any, muxer: SockdMuxer) {
    this.id = "testdocid" // generateId();

    this.muxer = muxer;
    this.editor = editor;

    this.muxer.add_callback(this.id, this.handle_sockd_remote);
  }

  init = async () => {
    const ydoc = new Y.Doc();
    const type = ydoc.getText("quill");

    this.provider = new EasyProvider(this.id, ydoc, (data) => {
      if (!this.muxer.active) {
        console.log("@sockd_not_ready");
      }
      this.muxer.send_yjs_message(this.id, encodeToBase64(data));
    });

    this.qbind = new QuillBinding(type, this.editor, this.provider.awareness);

    this.provider.start();
  };

  private handle_sockd_remote = (msg: DocMessage) => {
    const ydata = msg.yjs_data;
    if (!ydata || !this.provider) {
      console.log("@bailing_out", ydata);
      return;
    }

    const ddata = decodeFromBase64(ydata);
    console.log("@applying", ddata, this.id);

    this.provider.handleRemote(ddata);
  };
}
