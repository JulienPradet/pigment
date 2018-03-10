const fs = require("@pigment/fs");
const path = require("path");
const { mergeMap } = require("rxjs/operators");
const { stripIndent } = require("common-tags");

module.exports = paths => {
  return fs.mkdirp(path.dirname(paths.clientIndex)).pipe(
    mergeMap(() => {
      return fs.writefile(
        paths.clientIndex,
        stripIndent`
          import Page from "../../../src/pages";
          import React from "react";
          import ReactDOM from "react-dom";
    
          ReactDOM.render(<Page />, document.querySelector("#root"));
        `
      );
    })
  );
};
