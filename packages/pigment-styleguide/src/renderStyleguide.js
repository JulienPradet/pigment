import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const renderStyleguide = stories => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  ReactDOM.render(<App stories={stories} />, root);
};

export default renderStyleguide;
