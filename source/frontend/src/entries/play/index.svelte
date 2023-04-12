<script>
  import Tailwind from "../common/tailwind.svelte";
  import Timeline from "./timeline.svelte";
  import * as Y from "yjs";

  import { EasyProvider } from "temphia_yjs";

  const load = () => {
    const ydoc = new Y.Doc();
    
    const ep = new EasyProvider("hello", ydoc, (data) => {
      console.log("@data", data);
    });

    console.log("@EP", ep);
  };

  load();
</script>

<div>Hello</div>

<Tailwind />
