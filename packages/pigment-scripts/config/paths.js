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
    appIndex: path.join(__dirname, "../var/tmp/app/index.js"),
    serverEntry: path.join(__dirname, "../var/tmp/server/index.js"),
    clientEntry: path.join(__dirname, "../var/tmp/client/index.js"),
    log: resolveApp("var/log"),
    cacheBabel: resolveApp("var/cache/babel"),
    cacheEslint: resolveApp("var/cache/eslint"),
    tmp: path.join(__dirname, "../var/tmp"),
    src: resolveApp("src"),
    public: resolveApp("public"),
    nodePaths: [
      resolveApp("node_modules"),
      path.resolve(__dirname, "../node_modules")
    ]
  };
};
