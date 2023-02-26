import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { registerFactory } from "../../lib";

const appRenderer = (elem: HTMLElement, props: object) => {
  const root = createRoot(elem);
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );
};

registerFactory("lib", "tldraw.lib", (opts) => {
  appRenderer(opts["target"], opts["props"] || {});
});
