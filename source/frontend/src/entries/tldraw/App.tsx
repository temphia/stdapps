import { Tldraw } from "@tldraw/tldraw";
import * as React from "react";
import "./styles.css";

export default function Basic(props) {
  return (
    <div className="tldraw">
      <Tldraw {...props} />
    </div>
  );
}
