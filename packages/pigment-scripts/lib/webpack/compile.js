const { Observable } = require("rxjs/Observable");

module.exports = compiler => {
  return Observable.create(observer => {
    compiler.run(function(err, stats) {
      if (err) {
        console.log("IMPROVE LOGGING ERROR");
        console.error(err);
        observer.error(stats);
      } else {
        const messages = stats.toJson({}, true);
        if (messages.errors.length > 0) {
          observer.error(stats);
        } else {
          observer.next(stats);
        }
      }
      observer.complete();
    });
  });
};
