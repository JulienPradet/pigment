import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { toRoute, loadFirstRoute } from "./Router";
import ApolloProvider from "react-apollo/ApolloProvider";

const url = new URL(window.location.href);
const route = toRoute(url.pathname);

const clientRenderApp = (pages, apolloClient) => {
  loadFirstRoute(route, pages).then(() => {
    ReactDOM.hydrate(
      <ApolloProvider client={apolloClient}>
        <App pages={pages} initialRoute={route} />
      </ApolloProvider>,
      document.getElementById("root")
    );
  });
};

export default clientRenderApp;
