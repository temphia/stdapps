<script lang="ts">
  import { onMount } from "svelte";
  import Quill from "quill";
  import QuillCursors from "quill-cursors";

  import { Document } from "./service";
  import type { SimpleDocService } from "./service/service";

  export let service: SimpleDocService;

  let editor;
  let doc: Document;

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

    newDoc();
  });

  const newDoc = () => {
    doc = new Document(editor, service.muxer);
    doc.init();
  };
</script>

<div class="m-1 rounded bg-white h-full">
  <div id="editor" class="p-1 h-full">document here</div>
</div>
