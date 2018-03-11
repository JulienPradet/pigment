const fs = require("@pigment/fs");
const path = require("path");
const { mergeMap } = require("rxjs/operators");
const { stripIndent } = require("common-tags");
const prettier = require("prettier");
module.exports = paths => {
  return fs.mkdirp(path.dirname(paths.appIndex)).pipe(
    mergeMap(() => {
      return fs.writefile(
        paths.appIndex,
        prettier.format(stripIndent`
          import React from "react";
          import Page from "../../../src/pages";

          const App = () => <Page />;

          export default App;
        `)
      );
    })
  );
};
