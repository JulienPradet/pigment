const fs = require("@pigment/fs");
const path = require("path");
const { mergeMap } = require("rxjs/operators");
const { stripIndent } = require("common-tags");
const prettier = require("prettier");

module.exports = paths => {
  return fs.mkdirp(path.dirname(paths.clientEntry)).pipe(
    mergeMap(() => {
      return fs.writefile(
        paths.clientEntry,
        prettier.format(stripIndent`
          import App from "${path.relative(
            path.dirname(paths.clientEntry),
            paths.appIndex
          )}";
          import React from "react";
          import ReactDOM from "react-dom";

          ReactDOM.render(<App />, document.querySelector("#root"));
        `)
      );
    })
  );
};
