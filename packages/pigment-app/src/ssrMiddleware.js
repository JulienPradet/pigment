const React = require("react");
const express = require("express");
const { renderToNodeStream } = require("react-dom/server");
const App = require("./App").default;
const { toRoute, loadFirstRoute } = require("./Router");

const ssrMiddleware = (Document, pages) => ({ script }) => {
  const router = express.Router();

  router.get("*", (req, res, next) => {
    const route = toRoute(req.originalUrl);
    loadFirstRoute(route, pages).then(Component => {
      const app = (
        <App pages={pages} initialRoute={route} initialComponent={Component} />
      );
      res.write(`<!DOCTYPE html>`);
      renderToNodeStream(
        <Document
          scripts={
            <>
              <script type="text/javascript" src={script} />
            </>
          }
        >
          {app}
        </Document>
      ).pipe(res);
    });
  });

  return router;
};

module.exports = { ssrMiddleware };
