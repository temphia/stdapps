import EventmapMain from "./eventmap/subentries/main/index.svelte";
import { registerPlugFactory } from "../lib";

registerPlugFactory("eventmap.main", (opts) => {
  new EventmapMain({
    target: opts["target"],
    props: {
      env: opts.env,
    },
  });
});
