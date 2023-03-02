import Eventmap from "./eventmap/index.svelte";
import { registerPlugFactory } from "../lib";

registerPlugFactory("eventmap.main", (opts) => {
  new Eventmap({
    target: opts["target"] || document.getElementById("plugroot"),
    props: {
      env: opts.env,
    },
  });
});
