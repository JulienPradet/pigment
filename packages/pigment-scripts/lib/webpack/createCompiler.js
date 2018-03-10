const webpack = require("webpack");
const log = require("@pigment/log")("CLI");

const createCompiler = config => {
  const compiler = webpack(config);

  compiler.plugin("invalid", () => {
    log.message("info", "Compiling...");
  });

  compiler.plugin("done", stats => {
    const messages = stats.toJson({}, true);
    let failed = false;

    if (messages.errors.length > 0) {
      messages.errors.forEach(message => {
        failed = true;
        log.message("error", message);
      });
    }

    if (messages.warnings.length > 0) {
      messages.warnings.forEach(message => {
        log.message("warn", message);
      });
    }

    if (!failed) {
      log.message("success", "App compiled successfully!");
    }
  });

  return compiler;
};

module.exports = createCompiler;
