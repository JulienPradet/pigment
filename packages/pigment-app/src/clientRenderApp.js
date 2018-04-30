import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadFirstRoute } from "./Router";
import ApolloProvider from "react-apollo/ApolloProvider";
import { hydrate } from "react-emotion";

if ("__EMOTION_STATE__" in window) {
  hydrate(window.__EMOTION_STATE__);
}

const url = new URL(window.location.href);

const clientRenderApp = (pages, apolloClient) => {
  loadFirstRoute(url.href.replace(url.origin, ""), pages, apolloClient).then(
    route => {
      ReactDOM.hydrate(
        <ApolloProvider client={apolloClient}>
          <App
            pages={pages}
            initialRoute={route}
            getLocation={() => window.location}
            history={window.history}
          />
        </ApolloProvider>,
        document.getElementById("root")
      );
    }
  );
};

export default clientRenderApp;
