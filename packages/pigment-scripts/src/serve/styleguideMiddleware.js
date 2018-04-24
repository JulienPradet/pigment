const webpackDevMiddleware = require("webpack-dev-middleware");

module.exports = compiler => {
  return webpackDevMiddleware(compiler, {
    publicPath: "/_pigment/styleguide",
    logLevel: "silent"
  });
};
