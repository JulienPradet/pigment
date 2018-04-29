import React from "react";
import ReactDOM from "react-dom";
import App from "@pigment/app/src/App";
import stories from "./model/stories";
import addDependencies from "./model/addDependencies";
import StoriesContext from "./StoriesContext";
import { loadFirstRoute } from "@pigment/app/src/Router";
import pages from "./router/pages";
import hashHistory from "./router/hashHistory";

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
