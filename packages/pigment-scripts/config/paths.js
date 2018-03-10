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
    clientIndex: resolveApp("var/tmp/client/index.js"),
    log: resolveApp("var/log"),
    cacheBabel: resolveApp("var/cache/babel"),
    cacheEslint: resolveApp("var/cache/eslint"),
    tmp: resolveApp("var/tmp"),
    src: resolveApp("src"),
    nodePaths: [
      resolveApp("node_modules"),
      path.resolve(__dirname, "../node_modules")
    ]
  };
};
