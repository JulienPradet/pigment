import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { toRoute, loadFirstRoute } from "./Router";

const url = new URL(window.location.href);
const route = toRoute(url.pathname);

const clientRenderApp = pages => {
  loadFirstRoute(route, pages).then(() => {
    ReactDOM.hydrate(
      <App pages={pages} initialRoute={route} />,
      document.getElementById("root")
    );
  });
};

export default clientRenderApp;
