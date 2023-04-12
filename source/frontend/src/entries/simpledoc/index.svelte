<script lang="ts">
  import { onMount } from "svelte";
  import type { Environment } from "../../lib";
  import Tailwind from "../common/tailwind.svelte";
  import Quill from "quill";
  import QuillCursors from "quill-cursors";

  import { SimpleDocService } from "./service";

  export let env: Environment;

  let editor;
  let room_ticket;
  let service;

  const load = async () => {
    const resp = await env.PreformAction("load", {});
    if (!resp.ok) {
      return;
    }
    room_ticket = resp.data["data"]["room_tkt"];
    newService();
  };

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

    newService();
  });

  const newService = async () => {
    if (!room_ticket || !editor) {
      return;
    }

    const eam = await env.GetExecApiManager();

    service = new SimpleDocService(
      env,
      (callback) => eam.new_sockd_room(room_ticket, callback),
      editor
    );

    await service.init();
  };

  load();
</script>

<svelte:head>
  <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css" />
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css"
  />
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css"
  />
</svelte:head>

<div id="editor">SimpleDoc</div>

<Tailwind />
