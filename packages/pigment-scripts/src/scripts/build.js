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

const args = process.argv.slice(2);

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const paths = require("../../config/paths")();
const createPages = require("../generate/createPages");
const createClientEntry = require("../generate/createClient");
const createSsrMiddleware = require("../generate/createSsrMiddleware");
const createGraphQLModules = require("../generate/createGraphQLModules");
const createGraphQLMiddleware = require("../generate/createGraphQLMiddleware");
const createStyleguideEntry = require("../generate/createStyleguide");
const createStyleguideGraphQLMiddleware = require("../generate/createStyleguideGraphQLMiddleware");

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
    const config = require("../../config/webpack.config")(paths, "production");
    const compiler = require("../webpack/createCompiler")(config);

    const build = require("../build/build");

    return build(paths, compiler, () => {
      console.log("Done.");
    });
  }
);
