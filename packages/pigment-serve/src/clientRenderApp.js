import React from "react";
import ReactDOM from "react-dom";

const clientRenderApp = App => {
  const url = new URL(window.location.href);
  ReactDOM.hydrate(
    <App initialRoute={{ pathname: url.pathname }} />,
    document.getElementById("root")
  );
};

export { clientRenderApp };
