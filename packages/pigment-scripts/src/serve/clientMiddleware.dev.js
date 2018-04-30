const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");

module.exports = (paths, compiler) => {
  const router = express.Router();

  router.use(express.static(paths.public));
  router.use(require("webpack-hot-middleware")(compiler, { log: false }));
  router.use(
    webpackDevMiddleware(compiler, {
      publicPath: "/",
      serverSideRender: true,
      logLevel: "silent"
    })
  );

  return router;
};
