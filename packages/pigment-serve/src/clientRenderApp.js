import React from "react";
import ReactDOM from "react-dom";

const clientRenderApp = App => {
  const url = new URL(window.location.href);
  const history = {
    location: url.pathname
  };
  ReactDOM.hydrate(<App history={history} />, document.getElementById("root"));
};

export { clientRenderApp };
