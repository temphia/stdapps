import EventmapEmitter from "./eventmap/subentries/emitter/index.svelte";
import { registerPlugFactory } from "../lib";


registerPlugFactory("eventmap.emitter.main", (opts) => {
  new EventmapEmitter({
    target: opts["target"],
    props: {
      env: opts.env,
    },
  });
});
