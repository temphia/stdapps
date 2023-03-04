<script>
  import Taptap from "../../freeboard/board/elements/textbox/_taptap/taptap.svelte";

  let editor;
  const data = {};
</script>

<div>Task</div>

<Taptap bind:editor content={data["content"]} />
