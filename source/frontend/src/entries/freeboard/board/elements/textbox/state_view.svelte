<script lang="ts">
  export let data: object = {};

  $: console.log("@data??", data);
</script>

<div class="text-sm">
  {@html data["content"] || ""}
</div>
