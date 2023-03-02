<script>
  import { writable } from "svelte/store";
  import Root from "./root.svelte";
  import Shell from "./xterm/xterm.svelte";
  import RootLayout from "../common/root_layout.svelte";

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

<RootLayout name="simpleRAT">
  {#if _path === "root"}
    <Root on:open_shell={(ev) => open_shell(ev.detail)} />
  {:else if _path === "shell"}
    <Shell />
  {/if}
</RootLayout>
