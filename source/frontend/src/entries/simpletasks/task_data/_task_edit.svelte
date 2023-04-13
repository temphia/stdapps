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

<Quill contents={data["content"]} bind:getHTML />
