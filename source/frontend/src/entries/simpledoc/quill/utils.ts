import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { EasyProvider, encodeToBase64, decodeFromBase64 } from "temphia_yjs";
import * as Y from "yjs";
import type { EventmapService } from "../../eventmap/service";
import { generateId } from "../../common/id";

export const startYjsEditor = (container: string, service: EventmapService) => {
  Quill.register("modules/cursors", QuillCursors);

  const ydoc = new Y.Doc();
  const type = ydoc.getText("quill");

  var editor = new Quill(container, {
    modules: {
      cursors: true,
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
      ],
    },
    placeholder: "Start collaborating...",
    theme: "snow",
  });

  const id = generateId();

  const provider = new EasyProvider(id, ydoc, (data) => {
    console.log("@yjs_data", data);

    service.sockd.SendBroadcast({
      yjs_data: encodeToBase64(data),
    });
  });

  const binding = new QuillBinding(type, editor, provider.awareness);

  console.log("@handle", { ydoc, provider, binding, editor });

  service.fallback_handler = (msg) => {
    console.log("@fallback", msg);

    const ydata = msg.payload["yjs_data"];
    if (!ydata) {
      return;
    }

    const ddata = decodeFromBase64(ydata);

    console.log("@applying", ddata, id);

    provider.handleRemote(ddata);
  };

  provider.start();
};
