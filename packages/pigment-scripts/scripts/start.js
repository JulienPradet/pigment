const { mergeMap } = require("rxjs/operators");

module.exports = args => {
  process.env.BABEL_ENV = "development";
  process.env.NODE_ENV = "development";

  const paths = require("../config/paths")();
  const createApp = require("../lib/app/createApp");

  createApp(paths)
    .pipe(
      mergeMap(() => {
        const config = require("../config/webpack.config")(paths);
        const compiler = require("../lib/webpack/createCompiler")(config);
        const compile = require("../lib/webpack/compile");

        return compile(compiler);
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
