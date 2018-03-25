const fs = require("@pigment/fs");
const path = require("path");
const { mergeMap } = require("rxjs/operators");
const { stripIndent } = require("common-tags");
const prettier = require("prettier");

module.exports = paths => {
  return fs.mkdirp(path.dirname(paths.clientEntry)).pipe(
    mergeMap(() => {
      const pagesPath = path.relative(
        path.dirname(paths.clientEntry),
        paths.pagesIndex
      );

      return fs.writefile(
        paths.clientEntry,
        prettier.format(stripIndent`
          import pages from "${pagesPath}";
          import React from "react";
          import ReactDOM from "react-dom";
          import { loadComponents } from "loadable-components";
          import App from "@pigment/app/src/App";

          const url = new URL(window.location.href);

          loadComponents().then(() => {
            ReactDOM.hydrate(
              <App pages={pages} initialRoute={{ pathname: url.pathname }} />,
              document.getElementById("root")
            );
          });

          if (module.hot) {
            module.hot.accept("${pagesPath}", () => {
              const pages = require("${pagesPath}").default;
              ReactDOM.render(
                <App pages={pages} initialRoute={{ pathname: url.pathname }} />,
                document.getElementById("root")
              );
            });
          }
        `)
      );
    })
  );
};
