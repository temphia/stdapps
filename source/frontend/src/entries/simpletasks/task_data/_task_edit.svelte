<script>
  import Quill from "../../common/quill/quill.svelte";

  export let data = {};

  let getHTML;

  export const getValue = () => {
    console.log("@editor", editor);
    return getHTML();
  };

  $: console.log("@editor", data);
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

<Quill contents={data["content"]} bind:getHTML />
