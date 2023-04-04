import SimpleTasks from "./simpletasks/index.svelte";
import { registerPlugFactory } from "../lib";

registerPlugFactory("simpletasks.main", (opts) => {
  new SimpleTasks({
    target: opts["target"],
    props: {
      env: opts.env,
    },
  });
});
