const fs = require("@pigment/fs");
const path = require("path");
const { mergeMap } = require("rxjs/operators");
const { stripIndent } = require("common-tags");
const prettier = require("prettier");

module.exports = paths => {
  return fs.mkdirp(path.dirname(paths.serverEntry)).pipe(
    mergeMap(() => {
      return fs.writefile(
        paths.serverEntry,
        prettier.format(stripIndent`
          import App from "${path.relative(
            path.dirname(paths.serverEntry),
            paths.appIndex
          )}";
          import serverRenderApp from "@pigment/serve/src/serverRenderApp";

          export default serverRenderApp(App);
        `)
      );
    })
  );
};
