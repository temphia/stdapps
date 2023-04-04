<script lang="ts">
  import type { Environment } from "../../lib";
  import Tailwind from "../common/tailwind.svelte";
  import Taptap from "./taptap/taptap.svelte";

  import TapUi from "./taptap/ui.svelte"

  export let env: Environment;
</script>

<TapUi />

<Tailwind />
