const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");

module.exports = paths => {
  const router = express.Router();

  router.use(express.static(paths.buildClient));
  router.use(express.static(paths.public));

  return router;
};
