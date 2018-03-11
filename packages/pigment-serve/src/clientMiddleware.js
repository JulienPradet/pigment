const webpackDevMiddleware = require("webpack-dev-middleware");

module.exports = compiler => {
  return webpackDevMiddleware(compiler, {
    publicPath: "/",
    serverSideRender: true,
    logLevel: "silent"
  });
};
