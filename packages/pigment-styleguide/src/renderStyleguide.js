import React from "react";
import ReactDOM from "react-dom";
import { Provider as IsServerSideProvider } from "@pigment/app/src/IsServerSide";
import Router from "@pigment/app/src/Router";
import stories from "./model/stories";
import addDependencies from "./model/addDependencies";
import StoriesContext from "./StoriesContext";
import { loadFirstRoute } from "@pigment/app/src/Router";
import pages from "./router/pages";

const renderStyleguide = () => {
  const url = new URL(window.location.href);

  Promise.resolve(stories)
    .then(stories => addDependencies(stories))
    .then(stories => {
      loadFirstRoute(url.href.replace(url.origin, ""), pages).then(route => {
        const root = document.getElementById("root");
        ReactDOM.render(
          <IsServerSideProvider>
            <StoriesContext.Provider value={stories}>
              <Router
                pages={pages}
                initialRoute={route}
                getLocation={() => window.location}
                history={window.history}
              />
            </StoriesContext.Provider>
          </IsServerSideProvider>,
          root
        );
      });
    });
};

export default renderStyleguide;
