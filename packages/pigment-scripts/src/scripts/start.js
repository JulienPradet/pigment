const { Observable } = require("rxjs/Observable");
const { merge } = require("rxjs/observable/merge");
const {
  mergeMap,
  takeUntil,
  share,
  first,
  last,
  tap
} = require("rxjs/operators");

module.exports = args => {
  process.env.BABEL_ENV = "development";
  process.env.NODE_ENV = "development";

  const paths = require("../../config/paths")();
  const createPages = require("../generate/createPages");
  const createClientEntry = require("../generate/createClient");
  const createSsrMiddleware = require("../generate/createSsrMiddleware");
  const createGraphQLModules = require("../generate/createGraphQLModules");
  const createGraphQLMiddleware = require("../generate/createGraphQLMiddleware");
  const createStyleguideEntry = require("../generate/createStyleguide");
  const createStyleguideGraphQLMiddleware = require("../generate/createStyleguideGraphQLMiddleware");

  let served = null;

  const generateFiles$ = merge(
    createClientEntry(paths),
    createSsrMiddleware(paths),
    createGraphQLModules(paths),
    createGraphQLMiddleware(paths),
    createPages(paths, true),
    createStyleguideEntry(paths, true),
    createStyleguideGraphQLMiddleware(paths)
  ).pipe(share());

  const serveApp$ = generateFiles$.pipe(
    first(),
    mergeMap(() => {
      const config = require("../../config/webpack.config")(paths);
      const compiler = require("../webpack/createCompiler")(config);
      const serve = require("../serve/serve.dev");

      return Observable.create(observer => {
        const server = serve(paths, compiler);
        observer.next();
        server.on("close", () => {
          observer.complete();
        });
      });
    }),
    share()
  );

  const watchGeneratedFiles$ = generateFiles$.pipe(
    takeUntil(serveApp$.pipe(last()))
  );

  merge(serveApp$, watchGeneratedFiles$).subscribe(
    () => {},
    err => console.error(err),
    () => {
      process.exit(0);
    }
  );
};
