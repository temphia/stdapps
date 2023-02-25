<script lang="ts">
  import Taptap from "./_taptap/taptap.svelte";
  export let data: object = {};

  $: console.log("@taptap", data);
</script>

<Taptap content={data["content"] || `"<p>Hello World! 🌍️ </p>"`} />
