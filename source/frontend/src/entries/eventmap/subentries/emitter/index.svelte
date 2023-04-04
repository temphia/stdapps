<script lang="ts">
  import Tailwind from "../../../common/tailwind.svelte";
  import Emitter from "./emitter.svelte";
  export let env: any;
</script>

<Tailwind />

<div class="w-full bg-gray-50 py-4 px-1">
  <div
    class="card p-4 text-token border shadow mx-auto my-4 bg-white"
    style="max-width: 750px;"
  >
    <Emitter />
  </div>
</div>
