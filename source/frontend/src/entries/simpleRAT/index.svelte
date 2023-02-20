<script>
  import { writable } from "svelte/store";
  import Root from "./root.svelte";
  import Shell from "./shell.svelte";
  import Layout from "./_layout.svelte";

  const route = writable({
    path: "root",
    device: "",
  });

  const open_shell = (device) => {
    route.set({
      path: "shell",
      device,
    });
  };

  $: _path = $route.path;
  $: _device = $route.device;
</script>

<Layout>
  {#if _path === "root"}
    <Root on:open_shell={(ev) => open_shell(ev.detail)} />
  {:else if _path === "shell"}
    <Shell />
  {/if}
</Layout>
