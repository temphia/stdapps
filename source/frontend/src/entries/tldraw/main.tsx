import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const appRenderer = (elem: HTMLElement) => {
  const root = createRoot(elem);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const container = document.getElementById("root")!;

appRenderer(container);
