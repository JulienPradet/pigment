const path = require("path");
const express = require("express");
const { findCompiler, findStats } = require("./util");
const requireFromString = require("require-from-string");

module.exports = compiler => {
  const serverCompiler = findCompiler(compiler, "server")[0];
  const outputFs = serverCompiler.outputFileSystem;
  const outputPath = serverCompiler.outputPath;

  let serverRenderer = (req, res, next) => {
    console.log("TOTO");
    next();
  };

  compiler.plugin("done", stats => {
    const serverStats = findStats(stats, "server")[0].toJson();
    const filename = path.join(outputPath, serverStats.assetsByChunkName.main);
    const buffer = outputFs.readFileSync(filename);
    try {
      serverRenderer = requireFromString(buffer.toString());
      if (typeof serverRenderer !== "function") {
        serverRenderer = serverRenderer.default;
      }
    } catch (e) {
      console.error(e.stack);
    }
  });

  const router = express.Router();

  router.get("*", (req, res, next) => {
    serverRenderer(req, res, next);
  });

  return router;
};
