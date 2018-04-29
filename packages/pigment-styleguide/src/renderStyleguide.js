import React from "react";
import ReactDOM from "react-dom";
import App from "@pigment/app/src/App";
import { loadFirstRoute } from "@pigment/app/src/Router";
import { stories } from "./addStory";
import addDependencies from "./model/addDependencies";
import pages from "./pages";
import hashHistory from "./hashHistory";
import StoriesContext from "./StoriesContext";

const renderStyleguide = () => {
  const pathname = window.location.hash
    ? window.location.hash.replace(/^#/, "")
    : "/";

  Promise.resolve(stories)
    .then(stories => addDependencies(stories))
    .then(stories => {
      loadFirstRoute(pathname, pages).then(route => {
        const root = document.createElement("div");
        document.body.appendChild(root);
        ReactDOM.render(
          <StoriesContext.Provider value={stories}>
            <App
              pages={pages}
              initialRoute={route}
              getLocation={() => ({
                pathname: pathname
              })}
              history={hashHistory}
            />
          </StoriesContext.Provider>,
          root
        );
      });
    });
};

export default renderStyleguide;
