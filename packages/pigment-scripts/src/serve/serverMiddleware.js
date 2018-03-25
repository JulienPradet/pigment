const fs = require("fs");
const path = require("path");
const express = require("express");
const { findCompiler, findStats } = require("./util");
const requireFromString = require("require-from-string");
const log = require("@pigment/log")("SERVER");

module.exports = compiler => {
  const serverCompiler = findCompiler(compiler, "server")[0];
  const outputFs = serverCompiler.outputFileSystem;
  const outputPath = serverCompiler.outputPath;

  let serverRenderer;

  compiler.plugin("done", stats => {
    try {
      const serverStats = findStats(stats, "server")[0].toJson();
      const serverFilename = path.join(
        outputPath,
        serverStats.assetsByChunkName.main
      );
      const buffer = outputFs.readFileSync(serverFilename);
      const makeServerRenderer = requireFromString(buffer.toString()).default;

      serverRenderer = makeServerRenderer({
        clientStats: findStats(stats, "client")[0].toJson()
      });
    } catch (e) {
      console.log(e);
      log("error", "An error occured when updating the server\n" + e.stack);
    }
  });

  // the compiler does not need to be watched since webpack-dev-middleware
  // already launched the compiler

  const router = express.Router();

  router.get("*", (req, res, next) => {
    serverRenderer(req, res, next);
  });

  return router;
};
