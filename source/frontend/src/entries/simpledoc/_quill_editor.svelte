<script lang="ts">
  import { onMount } from "svelte";
  import Quill from "quill";
  import QuillCursors from "quill-cursors";

  import { Document } from "./service";
  import type { SimpleDocService } from "./service/service";

  export let service: SimpleDocService;
  export let doc_data = {};
  export let doc_meta;

  let editor;
  let doc: Document;

  let contents = doc_data["contents"] || "";

  onMount(async () => {
    Quill.register("modules/cursors", QuillCursors);

    editor = new Quill("#editor", {
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

    editor.root.innerHTML = contents;

    newDoc();
  });

  const newDoc = () => {
    doc = new Document(doc_meta["slug"], editor, service.muxer);
    doc.init();
  };
</script>

<div class="m-1 rounded bg-white h-full w-full mx-auto" style="max-width: 50rem;">
  <div id="editor" class="p-1 h-full" />
</div>
