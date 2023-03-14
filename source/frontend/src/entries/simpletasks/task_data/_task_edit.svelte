<script>
  import Taptap from "../../common/taptap/taptap.svelte";

  export let data = {};
  export const getValue = () => {
    console.log("@editor", editor);
    return editor.getHTML();
  };

  let editor;

  $: console.log("@editor", data)
</script>

<Taptap bind:editor content={data["content"]} />
