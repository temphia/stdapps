import FreeBoard from "./freeboard/index.svelte";
import { registerPlugFactory } from "../lib";

registerPlugFactory("freeboard.main", (opts) => {
  new FreeBoard({
    target: opts["target"],
    props: {
      env: opts.env,
    },
  });
});
