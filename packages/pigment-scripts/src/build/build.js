const { Observable } = require("rxjs/Observable");
const log = require("@pigment/log")("WEBPACK");

module.exports = (paths, compiler) => {
  return Observable.create(observer => {
    log.message("info", "Compiling...");
    compiler.run((err, stats) => {
      if (err) {
        observer.error(err);
      } else {
        observer.next();
        observer.complete();
      }
    });
  });
};
