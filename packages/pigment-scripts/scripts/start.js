const { Observable } = require("rxjs/Observable");
const { merge } = require("rxjs/observable/merge");
const { mergeMap, take } = require("rxjs/operators");

module.exports = args => {
  process.env.BABEL_ENV = "development";
  process.env.NODE_ENV = "development";

  const paths = require("../config/paths")();
  const createPages = require("../src/generate/createPages");
  const createClientEntry = require("../src/generate/createClientEntry");
  const createServerEntry = require("../src/generate/createServerEntry");

  let served = null;

  merge(createClientEntry(paths), createServerEntry(paths), createPages(paths))
    .pipe(
      take(1),
      mergeMap(() => {
        const config = require("../config/webpack.config")(paths);
        const compiler = require("../src/webpack/createCompiler")(config);
        const serve = require("../src/serve/serve");

        return Observable.create(observer => {
          const server = serve(paths, compiler);
          observer.next();
          server.on("close", () => {
            observer.complete();
          });
        });
      })
    )
    .subscribe(
      () => {},
      err => console.error(err),
      () => {
        process.exit(0);
      }
    );
};
