const React = require("react");
const { renderToNodeStream } = require("react-dom/server");
const App = require("./App").default;
const { toRoute, loadFirstRoute } = require("./Router");

const serverRenderApp = (Document, pages) => ({ script }) => (
  req,
  res,
  next
) => {
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
};

module.exports = { serverRenderApp };
