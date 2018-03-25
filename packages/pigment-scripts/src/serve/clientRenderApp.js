import React from "react";
import ReactDOM from "react-dom";
import { loadComponents } from "loadable-components";

const clientRenderApp = App => {
  const url = new URL(window.location.href);
  loadComponents().then(() => {
    ReactDOM.hydrate(
      <App initialRoute={{ pathname: url.pathname }} />,
      document.getElementById("root")
    );
  });
};

export { clientRenderApp };
