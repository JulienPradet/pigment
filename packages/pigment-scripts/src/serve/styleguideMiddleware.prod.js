const path = require("path");
const express = require("express");
const { stripIndent } = require("common-tags");

module.exports = paths => {
  const styleguideStats = require(path.join(
    paths.build,
    "stats/stats.styleguide.json"
  ));

  const script = "/" + styleguideStats.assetsByChunkName.styleguide[0];

  const makeStyleguideMiddleware = () => {
    return (req, res, next) => {
      res.send(stripIndent`
        <!doctype html>
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

  const router = express.Router();
  router.use("/_pigment/styleguide*", makeStyleguideMiddleware());
  return router;
};
