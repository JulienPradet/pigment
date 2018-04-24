import React from "react";
import ReactDOM from "react-dom";
import App from "@pigment/app/src/App";
import { loadFirstRoute } from "@pigment/app/src/Router";
import { stories } from "./addStory";
import getPagesFromStories from "./getPagesFromStories";
import hashHistory from "./hashHistory";

const renderStyleguide = () => {
  const pathname = window.location.hash
    ? window.location.hash.replace(/^#/, "")
    : "/";

  getPagesFromStories(stories).then(pages => {
    loadFirstRoute(pathname, pages).then(route => {
      const root = document.createElement("div");
      document.body.appendChild(root);
      ReactDOM.render(
        <App
          pages={pages}
          initialRoute={route}
          getLocation={() => ({
            pathname: pathname
          })}
          history={hashHistory}
        />,
        root
      );
    });
  });
};

export default renderStyleguide;
