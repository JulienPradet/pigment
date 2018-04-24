const path = require("path");
const fs = require("fs");

module.exports = () => {
  var appDirectory = fs.realpathSync(process.cwd());

  function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
  }

  return {
    build: resolveApp("build"),
    buildClient: resolveApp("build/client"),
    buildServer: resolveApp("build/server"),
    tmp: path.join(__dirname, "../var/tmp"),
    pagesIndex: path.join(__dirname, "../var/tmp/app/index.js"),
    graphQLEntry: path.join(
      __dirname,
      "../var/tmp/server/graphQLMiddleware.js"
    ),
    ssrEntry: path.join(__dirname, "../var/tmp/server/ssrMiddleware.js"),
    clientEntry: path.join(__dirname, "../var/tmp/client/index.js"),
    styleguideEntry: path.join(__dirname, "../var/tmp/styleguide/index.js"),
    log: resolveApp("var/log"),
    cacheBabel: resolveApp("var/cache/babel"),
    cacheEslint: resolveApp("var/cache/eslint"),
    src: resolveApp("src"),
    pages: resolveApp("src/client/pages"),
    graphqlModules: resolveApp("src/server/modules"),
    public: resolveApp("public"),
    nodePaths: [
      resolveApp("node_modules"),
      path.resolve(__dirname, "../../../node_modules")
    ]
  };
};
