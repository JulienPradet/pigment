import React from "react";
import express from "express";
import { renderToNodeStream } from "react-dom/server";
import App from "./App";
import { loadFirstRoute } from "./Router";
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
    const apolloClient = makeApolloClient({
      uri: process.env.PUBLIC_URL + "/graphql",
      ssr: true,
      fetch
    });

    loadFirstRoute(req.originalUrl, pages, apolloClient)
      .then(route => {
        const app = (
          <ApolloProvider client={apolloClient}>
            <App pages={pages} initialRoute={route} />
          </ApolloProvider>
        );

        return getDataFromTree(app).then(() => {
          const serializedData = serializeData(apolloClient.extract());

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
                  <script type="text/javascript" src={script} async />
                </>
              }
            >
              {app}
            </Document>
          ).pipe(res);
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500);
        res.send(":/");
      });
  });

  return router;
};

export { ssrMiddleware };
