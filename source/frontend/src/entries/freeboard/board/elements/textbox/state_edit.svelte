<script lang="ts">
  import Quill from "../../../../common/quill/quill.svelte";

  export let data: object = {};

  let getHTML;
  export const getValue = () => ({ content: getHTML() });
</script>


<Quill contents={data["content"]} bind:getHTML />
