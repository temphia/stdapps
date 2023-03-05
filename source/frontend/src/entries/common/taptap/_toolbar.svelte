<script lang="ts">
  export let editor;
</script>

<div class="flex flex-wrap gap-1  bg-gray-100 p-1 rounded">
  <button
    on:click={() => console.log && editor.chain().focus().toggleBold().run()}
    disabled={!editor.can().chain().focus().toggleBold().run()}
    class={editor.isActive("bold") ? "is-active" : ""}
  >
    🇧
  </button>
  <button
    on:click={() => editor.chain().focus().toggleItalic().run()}
    disabled={!editor.can().chain().focus().toggleItalic().run()}
    class="font-bold italic {editor.isActive('italic') ? 'is-active' : ''}"
  >
    I
  </button>
  <button
    on:click={() => editor.chain().focus().toggleStrike().run()}
    disabled={!editor.can().chain().focus().toggleStrike().run()}
    class="line-through {editor.isActive('strike') ? 'is-active' : ''}"
  >
    S
  </button>

  <button
    on:click={() => editor.chain().focus().toggleCode().run()}
    disabled={!editor.can().chain().focus().toggleCode().run()}
    class="font-bold {editor.isActive('code') ? 'is-active' : ''}"
  >
    {"[]"}
  </button>
  <button
    on:click={() => editor.chain().focus().setParagraph().run()}
    class="font-bold {editor.isActive('paragraph') ? 'is-active' : ''}"
  >
    p
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    class="font-bold {editor.isActive('heading', { level: 1 })
      ? 'is-active'
      : ''}"
  >
    h1
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class="font-bold {editor.isActive('heading', { level: 2 })
      ? 'is-active'
      : ''}"
  >
    h2
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
    class="font-bold {editor.isActive('heading', { level: 3 })
      ? 'is-active'
      : ''}"
  >
    h3
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
    class="font-bold {editor.isActive('heading', { level: 4 })
      ? 'is-active'
      : ''}"
  >
    h4
  </button>
  <button
    on:click={() => editor.chain().focus().toggleBulletList().run()}
    class={editor.isActive("bulletList") ? "is-active" : ""}
  >
    ⚫
  </button>
  <button
    on:click={() => editor.chain().focus().toggleOrderedList().run()}
    class={editor.isActive("orderedList") ? "is-active" : ""}
  >
    ◼️
  </button>
  <button
    on:click={() => editor.chain().focus().toggleCodeBlock().run()}
    class="font-bold {editor.isActive('codeBlock') ? 'is-active' : ''}"
  >
    {"</>"}
  </button>
  <button
    on:click={() => editor.chain().focus().toggleBlockquote().run()}
    class={editor.isActive("blockquote") ? "is-active" : ""}
  >
    💭
  </button>

  <button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
    hr
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

  <button
    class="ml-2"
    on:click={() => {
      const url = window.prompt("URL");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }}
  >
    🔗</button
  >

  <label>
    <input
      type="file"
      on:change={(ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          editor.chain().focus().setImage({ src: reader.result }).run();
        };
      }}
    />
    🖼️</label
  >
</div>

<style>
  button.is-active {
    background: black;
    color: white;
  }

  button {
    padding: 0.25rem;
    border: 1px;
    border-radius: 5px;
  }

  label {
    padding: 0.25rem;
    border: 1px;
    border-radius: 5px;
  }

  label:hover {
    background-color: rgb(168, 161, 161);
  }

  button:hover {
    background-color: rgb(168, 161, 161);
  }

  input[type="file"] {
    display: none;
  }
</style>
