<script>
  import StarterKit from "@tiptap/starter-kit";
  import { Editor } from "@tiptap/core";
  import Image from "@tiptap/extension-image";

  import { onMount } from "svelte";

  export let content = "<p>Hello World! 🌍️ </p>";
  export let editor = null;

  let element = null;

  Image.configure({
    allowBase64: true,
  });

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [Image, StarterKit],
      content,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
    });
  });
</script>

<div class="p-2" bind:this={element} />

<style global>
  /* Basic editor styles */
  .ProseMirror > * + * {
    margin-top: 0.75em;
  }
  .ProseMirror ul,
  .ProseMirror ol {
    padding: 0 1rem;
  }

  .ProseMirror h1,
  .ProseMirror h2,
  .ProseMirror h3,
  .ProseMirror h4,
  .ProseMirror h5,
  .ProseMirror h6 {
    line-height: 1.1;
  }
  .ProseMirror code {
    background-color: rgba(97, 97, 97, 0.1);
    color: #616161;
  }
  .ProseMirror pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
  }
  .ProseMirror pre code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
  }
  .ProseMirror img {
    max-width: 100%;
    height: auto;
  }
  .ProseMirror blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(13, 13, 13, 0.1);
  }
  .ProseMirror hr {
    border: none;
    border-top: 2px solid rgba(13, 13, 13, 0.1);
    margin: 2rem 0;
  }
</style>
