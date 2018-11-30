import React from "react";
import { renderToString, renderToNodeStream } from "react-dom/server";
import through2 from "through2";
import App from "./App";
import { loadFirstRoute } from "./Router";
import makeApolloClient from "./makeApolloClient";
import serialize from "serialize-javascript";
import ApolloProvider from "react-apollo/ApolloProvider";
import getDataFromTree from "react-apollo/getDataFromTree";
import fetch from "node-fetch";
import { extractCritical } from "emotion-server";

const serializeData = data =>
  data ? serialize(data, { isJSON: true }) : JSON.stringify(null);

const renderPage = ({ Document, pages, cacheRedirects, script, url }) => {
  const apolloClient = makeApolloClient({
    ssr: true,
    fetch,
    cacheRedirects: cacheRedirects
  });

  return loadFirstRoute(url, pages, apolloClient).then(route => {
    const app = (
      <ApolloProvider client={apolloClient}>
        <App pages={pages} initialRoute={route} />
      </ApolloProvider>
    );

    return getDataFromTree(app).then(() => {
      const serializedData = serializeData(apolloClient.extract());
      const { css, ids } = extractCritical(renderToString(app));
      const serializedEmotion = serializeData(ids);

      return renderToNodeStream(
        <Document
          style={css}
          scripts={
            <>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `window.__APOLLO_STATE__ = ${serializedData};`
                }}
              />
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `window.__EMOTION_STATE__ = ${serializedEmotion};`
                }}
              />
              <script type="text/javascript" src={script} async />
            </>
          }
        >
          {app}
        </Document>
      ).pipe(
        through2.obj(function(chunk, enc, callback) {
          if (!this.doctype) {
            this.doctype = true;
            this.push(`<!DOCTYPE html>`);
          }
          this.push(chunk);
          callback();
        })
      );
    });
  });
};

export { renderPage };
