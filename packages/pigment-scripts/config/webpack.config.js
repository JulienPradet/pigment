module.exports = (paths, env) => [
  require("./webpack.config.client")(paths, env),
  require("./webpack.config.styleguide")(paths, env),
  require("./webpack.config.server")(paths, env)
];
