<script>
  import Taptap from "../../common/_taptap/taptap.svelte";

  let editor;
  const data = {};
</script>


<Taptap bind:editor content={data["content"]} />
