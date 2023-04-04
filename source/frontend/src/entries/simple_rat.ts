import SimpleRAT from "./simpleRAT/index.svelte";
import { registerPlugFactory } from "../lib";

registerPlugFactory("simple_rat.main", (opts) => {
  new SimpleRAT({
    target: opts["target"],
    props: {
      env: opts.env,
    },
  });
});
