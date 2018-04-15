import React from "react";
import express from "express";
import { renderToNodeStream } from "react-dom/server";
import App from "./App";
import { toRoute, loadFirstRoute } from "./Router";
import makeApolloClient from "./makeApolloClient";
import serialize from "serialize-javascript";
import ApolloProvider from "react-apollo/ApolloProvider";
import getDataFromTree from "react-apollo/getDataFromTree";
import fetch from "node-fetch";

const serializeData = data =>
  data ? serialize(data, { isJSON: true }) : JSON.stringify(null);

const ssrMiddleware = (Document, pages) => ({ script }) => {
  const router = express.Router();

  router.get("*", (req, res, next) => {
    const route = toRoute(req.originalUrl);
    loadFirstRoute(route, pages).then(Component => {
      const client = makeApolloClient({
        uri: process.env.PUBLIC_URL + "/graphql",
        ssr: true,
        fetch
      });

      const app = (
        <ApolloProvider client={client}>
          <App
            pages={pages}
            initialRoute={route}
            initialComponent={Component}
          />
        </ApolloProvider>
      );

      getDataFromTree(app).then(() => {
        const serializedData = serializeData(client.extract());

        res.write(`<!DOCTYPE html>`);
        renderToNodeStream(
          <Document
            scripts={
              <>
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: `window.__APOLLO_STATE__ = ${serializedData};`
                  }}
                />
                <script type="text/javascript" src={script} />
              </>
            }
          >
            {app}
          </Document>
        ).pipe(res);
      });
    });
  });

  return router;
};

export { ssrMiddleware };
