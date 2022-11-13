import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { globalStyles } from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Apply Stitches global styles
globalStyles();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
