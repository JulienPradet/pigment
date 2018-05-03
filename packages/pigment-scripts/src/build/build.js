const { Observable } = require("rxjs/Observable");
const log = require("@pigment/log")("WEBPACK");

module.exports = (paths, compiler) => {
  log.message("info", "Compiling...");
  compiler.run(err => {
    if (err) {
      console.log("IMPROVE LOGGING ERROR");
      throw err;
    }
  });
};
