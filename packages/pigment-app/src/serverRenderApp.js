const React = require("react");
const { renderToNodeStream } = require("react-dom/server");
const { getLoadableState } = require("loadable-components/server");

const serverRenderApp = (Document, App) => ({ script }) => (req, res, next) => {
  const app = <App initialRoute={{ pathname: req.originalUrl }} />;
  getLoadableState(app).then(loadableState => {
    res.write(`<!DOCTYPE html>`);
    renderToNodeStream(
      <Document
        scripts={
          <>
            {loadableState.getScriptElement()}
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
