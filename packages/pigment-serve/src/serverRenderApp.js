const React = require("react");
const { renderToString } = require("react-dom/server");

const serverRenderApp = (Document, App) => {
  return ({ clientStats }) => (req, res, next) => {
    const script =
      clientStats.publicPath + clientStats.assetsByChunkName.main[0];

    const main = renderToString(
      <App initialRoute={{ pathname: req.originalUrl }} />
    );

    res.send(
      renderToString(
        <Document
          scripts={
            <>
              <script type="text/javascript" src={script} />
            </>
          }
        >
          {main}
        </Document>
      )
    );
  };
};

module.exports = { serverRenderApp };
