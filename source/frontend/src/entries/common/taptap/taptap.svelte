<script>
  import StarterKit from "@tiptap/starter-kit";
  import { Editor } from "@tiptap/core";
  import { onMount } from "svelte";
  import ButtonToggle from "./_button_toggle.svelte";

  export let content = "<p>Hello World! 🌍️ </p>";
  export let editor = null;

  let element = null;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit],
      content,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
    });
  });
</script>

{#if editor}
  <div>
    <!-- <div>
      <button
        on:click={() =>
          console.log && editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        class={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        on:click={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        class={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        on:click={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        class={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>

      <button
        on:click={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        class={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>

      <button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button on:click={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        on:click={() => editor.chain().focus().setParagraph().run()}
        class={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        on:click={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()}
        class={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        on:click={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()}
        class={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        on:click={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()}
        class={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        on:click={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()}
        class={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        on:click={() =>
          editor.chain().focus().toggleHeading({ level: 5 }).run()}
        class={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        on:click={() =>
          editor.chain().focus().toggleHeading({ level: 6 }).run()}
        class={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBulletList().run()}
        class={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        on:click={() => editor.chain().focus().toggleOrderedList().run()}
        class={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        on:click={() => editor.chain().focus().toggleCodeBlock().run()}
        class={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBlockquote().run()}
        class={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>

      <button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button on:click={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        on:click={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        on:click={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
    </div> -->

    <div
      class="flex flex-wrap items-center divide-gray-200 sm:divide-x bg-gray-100"
    >
      <div class="flex items-center space-x-1 sm:pr-4">
        <ButtonToggle>
          <path
            fill-rule="evenodd"
            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
            clip-rule="evenodd"
          />
        </ButtonToggle>

        <ButtonToggle>
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clip-rule="evenodd"
          />
        </ButtonToggle>

        <ButtonToggle
          on:click={() => {
            console.log("@aaaa")
            editor.chain().focus().toggleCode().run()
          }}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          {editor}
        >
          <path
            fill-rule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </ButtonToggle>
      </div>

      <ButtonToggle>
        <path
          fill-rule="evenodd"
          d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </ButtonToggle>
    </div>
  </div>
{/if}
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
