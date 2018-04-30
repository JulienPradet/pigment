const fs = require("fs");
const path = require("path");
const express = require("express");
const { findCompiler, findStats } = require("./util");
const requireFromString = require("require-from-string");
const log = require("@pigment/log")("SERVER");

module.exports = (paths, compiler) => {
  const serverCompiler = findCompiler(compiler, "server")[0];
  const outputFs = serverCompiler.outputFileSystem;
  const outputPath = serverCompiler.outputPath;

  let ssrMiddleware;
  let graphQLMiddleware;

  const makeSsrMiddleware = stats => {
    const serverStats = findStats(stats, "server")[0].toJson();
    const ssrFilename = path.join(
      outputPath,
      serverStats.assetsByChunkName.ssr
    );
    const buffer = outputFs.readFileSync(ssrFilename);
    const ssrMiddleware = requireFromString(buffer.toString()).default;

    const clientStats = findStats(stats, "client")[0].toJson();
    const script =
      clientStats.publicPath + clientStats.assetsByChunkName.main[0];

    return ssrMiddleware({ script });
  };

  const makeGraphQLMiddleware = stats => {
    const serverStats = findStats(stats, "server")[0].toJson();
    const graphQLFilename = path.join(
      outputPath,
      serverStats.assetsByChunkName.graphql
    );
    const buffer = outputFs.readFileSync(graphQLFilename);
    const graphQLMiddleware = requireFromString(buffer.toString()).default;

    return graphQLMiddleware;
  };

  compiler.plugin("done", stats => {
    try {
      ssrMiddleware = makeSsrMiddleware(stats);
      graphQLMiddleware = makeGraphQLMiddleware(stats);
    } catch (e) {
      log.message(
        "error",
        "An error occured when updating the server\n" + e.stack
      );
    }
  });

  // the compiler does not need to be watched since webpack-dev-middleware
  // already launched the compiler

  const router = express.Router();

  router.use((req, res, next) => {
    graphQLMiddleware.handle(req, res, next);
  });
  router.use((req, res, next) => {
    ssrMiddleware.handle(req, res, next);
  });

  return router;
};
