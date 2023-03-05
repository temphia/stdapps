<script lang="ts">
  import Taptap from "../../../../common/taptap/taptap.svelte";
  export let data: object = {};

  let editor;

  export const getValue = () => ({ content: editor.getHTML() });
</script>

<div class="overflow-auto" style="height:calc(100vh - 4em);">
  <Taptap bind:editor content={data["content"]} />
</div>
