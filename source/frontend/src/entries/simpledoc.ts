import SimpleDoc from "./simpledoc/index.svelte";
import { registerPlugFactory } from "../lib";

registerPlugFactory("simpledoc.main", (opts) => {
  new SimpleDoc({
    target: opts["target"],
    props: {
      env: opts.env,
    },
  });
});
