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
  process.env.BABEL_ENV = "production";
  process.env.NODE_ENV = "production";

  const paths = require("../config/paths")();
  const createPages = require("../src/generate/createPages");
  const createClientEntry = require("../src/generate/createClient");
  const createSsrMiddleware = require("../src/generate/createSsrMiddleware");
  const createGraphQLModules = require("../src/generate/createGraphQLModules");
  const createGraphQLMiddleware = require("../src/generate/createGraphQLMiddleware");
  const createStyleguideEntry = require("../src/generate/createStyleguide");
  const createStyleguideGraphQLMiddleware = require("../src/generate/createStyleguideGraphQLMiddleware");

  const generateFiles$ = merge(
    createClientEntry(paths),
    createSsrMiddleware(paths),
    createGraphQLModules(paths),
    createGraphQLMiddleware(paths),
    createPages(paths),
    createStyleguideEntry(paths),
    createStyleguideGraphQLMiddleware(paths)
  );

  generateFiles$.subscribe(
    () => {},
    err => {
      console.error(err);
    },
    () => {
      const config = require("../config/webpack.config")(paths, "production");
      const compiler = require("../src/webpack/createCompiler")(config);
      const build = require("../src/build/build");
      return build(paths, compiler);
    }
  );
};
