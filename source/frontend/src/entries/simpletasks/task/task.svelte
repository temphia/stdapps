<script>
  import Taptap from "../../common/taptap/taptap.svelte";

  let editor;
  const data = {};

  const getValue = () => {};
</script>

<div class="overflow-auto" style="height:calc(100vh - 4em);">
  <Taptap bind:editor content={data["content"]} />
</div>
