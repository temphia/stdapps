import { QuillBinding } from "y-quill";
import {
  EasyProvider,
  encodeToBase64,
  decodeFromBase64,
} from "../../common/yjs/easyprovider";
import * as Y from "yjs";
import type { Environment } from "../../../lib";
import type { DocMessage, SockdMuxer } from "./muxer";

export class Document {
  editor: any;
  env: Environment;

  muxer: SockdMuxer;
  provider: EasyProvider;
  id: string;
  qbind: QuillBinding;

  constructor(id: string, editor: any, muxer: SockdMuxer) {
    this.id = id;

    this.muxer = muxer;
    this.editor = editor;

    this.muxer.add_callback(this.id, this.handle_sockd_remote);
  }

  init = async (data) => {
    const ydoc = new Y.Doc();
    const text = ydoc.getText("quill");
    if (data) {
      Y.applyUpdateV2(ydoc, decodeFromBase64(data));
    }

    this.provider = new EasyProvider(this.id, ydoc, (data) => {
      if (!this.muxer.active) {
        console.log("@sockd_not_ready");
      }
      this.muxer.send_yjs_message(this.id, encodeToBase64(data));
    });

    this.qbind = new QuillBinding(text, this.editor, this.provider.awareness);
    this.provider.start();

    console.log("@debug_simple_doc", this);
  };

  get_contents = () => {
    const yjs_state_b64 = encodeToBase64(
      Y.encodeStateAsUpdateV2(this.qbind.doc)
    );
    
    const quill_state_html = this.editor.root.innerHTML;

    return {
      yjs_state_b64,
      quill_state_html,
    };
  };

  close = () => {
    this.muxer.remove_callback(this.id);
    this.provider.close();
    this.qbind.destroy();
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
