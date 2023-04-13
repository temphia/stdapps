<script lang="ts">
  import { onMount } from "svelte";
  import Quill from "quill";
  import QuillCursors from "quill-cursors";

  export let contents = "";
  export let editor = null;
  export const getHTML = () => editor.root.innerHTML;

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
      placeholder: "start writing..",
      theme: "snow",
    });

    editor.root.innerHTML = contents;
  });
</script>

<div>
  <div id="editor" class="p-1" />
</div>
