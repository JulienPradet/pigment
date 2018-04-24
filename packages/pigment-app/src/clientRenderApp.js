import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadFirstRoute } from "./Router";
import ApolloProvider from "react-apollo/ApolloProvider";

const url = new URL(window.location.href);

const clientRenderApp = (pages, apolloClient) => {
  loadFirstRoute(url.pathname, pages, apolloClient).then(route => {
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
  });
};

export default clientRenderApp;
