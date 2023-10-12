import React from "react";
// import ReactDOM from "react-dom/client";
import { hydrateRoot, createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import DarkModeProvider from "./context/DarkModeContext";

const APP = (
  <BrowserRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrateRoot(APP, rootElement);
} else {
  const root = createRoot(rootElement);
  root.render(APP, rootElement);
}
