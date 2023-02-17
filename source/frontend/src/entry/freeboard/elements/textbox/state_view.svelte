<script lang="ts">
  export let data: object = {};

  $: console.log("@data??", data);
</script>

<div>
  {@html data["content"] || ""}
</div>
