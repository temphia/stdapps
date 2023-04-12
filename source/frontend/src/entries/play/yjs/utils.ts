import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { EasyProvider } from "./easyprovider";
import * as Y from "yjs";
import type { EventmapService } from "../../eventmap/service";
import { generateId } from "../../common/id";

export const encodeToBase64 = (uint8Array) => {
  const arrayBuffer = uint8Array.buffer;
  const dataView = new DataView(arrayBuffer);
  let binaryString = "";
  for (let i = 0; i < dataView.byteLength; i++) {
    binaryString += String.fromCharCode(dataView.getUint8(i));
  }
  return btoa(binaryString);
};

export const decodeFromBase64 = (base64String) => {
  const binaryString = atob(base64String);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
};

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

  console.log("@ydoc", ydoc);
  console.log("@provider", provider);
  console.log("@binding", binding);
  console.log("@editor", editor);

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
