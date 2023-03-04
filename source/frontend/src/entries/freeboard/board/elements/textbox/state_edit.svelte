<script lang="ts">
  import Taptap from "../../../../common/taptap/taptap.svelte";
  export let data: object = {};

  let editor;

  export const getValue = () => ({ content: editor.getHTML() });
  

</script>

<Taptap bind:editor content={data["content"]} />
