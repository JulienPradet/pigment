const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  const pagesPath = path.relative(
    path.dirname(paths.clientEntry),
    paths.pagesIndex
  );

  return of(
    stripIndent`
      import pages from "${pagesPath}";
      import clientRenderApp from "@pigment/app/src/clientRenderApp";

      clientRenderApp(pages)

      if (module.hot) {
        module.hot.accept("${pagesPath}", () => {
          const pages = require("${pagesPath}").default;
          clientRenderApp(pages)
        });
      }
    `
  ).pipe(writeGeneratedFile(paths.clientEntry));
};
