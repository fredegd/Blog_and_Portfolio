import React from "react";
// import ReactDOM from "react-dom/client";
import { hydrate, render } from "react-dom";

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
  hydrate(APP, rootElement);
} else {
  render(APP, rootElement);
}
