module.exports = paths => [
  require("./webpack.config.client")(paths),
  require("./webpack.config.server")(paths)
];
