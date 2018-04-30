const express = require("express");
const { findCompiler, findStats } = require("./util");

module.exports = compiler => {
  const router = express.Router();
  let styleguideMiddleware;

  const makeStyleguideMiddleware = stats => {
    return (req, res) => {
      const styleguideStats = findStats(stats, "styleguide")[0].toJson();
      const script =
        styleguideStats.publicPath +
        styleguideStats.assetsByChunkName.styleguide[0];

      res.send(`
        <html>
          <head>
            <title>Pigment Styleguide</title>
          </head>
          <body>
            <div id="root"></div>
            <script src="${script}"></script>
          </body>
        </html>
      `);
    };
  };

  compiler.plugin("done", stats => {
    try {
      styleguideMiddleware = makeStyleguideMiddleware(stats);
    } catch (e) {
      log.message(
        "error",
        "An error occured when updating the styleguide\n" + e.stack
      );
    }
  });

  router.use("/_pigment/styleguide*", (req, res, next) => {
    styleguideMiddleware(req, res, next);
  });

  return router;
};
