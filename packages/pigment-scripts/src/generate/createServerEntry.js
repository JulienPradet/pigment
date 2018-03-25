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
          import pages from "./${path.relative(
            path.dirname(paths.serverEntry),
            paths.pagesIndex
          )}";
          import Document from "./${path.relative(
            path.dirname(paths.serverEntry),
            path.join(paths.src, "Document.js")
          )}";
          import {serverRenderApp} from "@pigment/app/src/serverRenderApp";

          export default serverRenderApp(Document, pages);
        `)
      );
    })
  );
};
