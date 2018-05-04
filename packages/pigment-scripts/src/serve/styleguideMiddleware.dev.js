const path = require("path");
const express = require("express");
const { findCompiler, findStats } = require("./util");
const { stripIndent } = require("common-tags");
const requireFromString = require("require-from-string");

module.exports = (paths, compiler, compilerDone$) => {
  const serverCompiler = findCompiler(compiler, "server")[0];
  const outputFs = serverCompiler.outputFileSystem;
  const outputPath = serverCompiler.outputPath;

  let styleguideMiddleware;
  let styleguideGraphQLMiddleware;

  const makeStyleguideMiddleware = stats => {
    return (req, res) => {
      const styleguideStats = findStats(stats, "styleguide")[0].toJson();
      const script =
        styleguideStats.publicPath +
        styleguideStats.assetsByChunkName.styleguide[0];

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

  const makeStyleguideGraphQLMiddleware = stats => {
    const serverStats = findStats(stats, "server")[0].toJson();
    const styleguideGraphQLFilename = path.join(
      outputPath,
      serverStats.assetsByChunkName.styleguideGraphQL
    );
    const buffer = outputFs.readFileSync(styleguideGraphQLFilename);
    const styleguideGraphQLMiddleware = requireFromString(buffer.toString())
      .default;

    return styleguideGraphQLMiddleware;
  };

  compilerDone$.subscribe(stats => {
    try {
      styleguideMiddleware = makeStyleguideMiddleware(stats);
      styleguideGraphQLMiddleware = makeStyleguideGraphQLMiddleware(stats);
    } catch (e) {
      log.message(
        "error",
        "An error occured when updating the styleguide\n" + e.stack
      );
    }
  });

  const router = express.Router();

  router.use("/_pigment/styleguide", (req, res, next) => {
    styleguideGraphQLMiddleware.handle(req, res, next);
  });

  router.use("/_pigment/styleguide*", (req, res, next) => {
    styleguideMiddleware(req, res, next);
  });

  return router;
};
