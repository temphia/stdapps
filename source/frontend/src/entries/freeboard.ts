import FreeBoard from "./freeboard/index.svelte";
import type { FactoryOptions } from "../lib";
import { registerPlugFactory } from "../lib";

registerPlugFactory("freeboard.main", (opts: FactoryOptions) => {
  new FreeBoard({
    target: document.getElementById("plugroot"), // opts.target,
    props: {
      env: opts.env,
    },
  });
});
