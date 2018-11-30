const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  return of(stripIndent`
    import pages from "./${path.relative(
      path.dirname(paths.buildStaticFilesEntry),
      paths.pagesIndex
    )}";
    import Document from "./${path.relative(
      path.dirname(paths.buildStaticFilesEntry),
      path.join(paths.src, "Document.js")
    )}";
    import cacheRedirects from "./${path.relative(
      path.dirname(paths.buildStaticFilesEntry),
      path.join(paths.src, "client/graphql/cacheRedirects.js")
    )}";
    import {staticFilesGenerator} from "pigment-app/src/staticFilesGenerator";

    export default staticFilesGenerator(
      Document,
      pages,
      cacheRedirects,
      ${JSON.stringify(paths.buildClient)}
    );
  `).pipe(writeGeneratedFile(paths.buildStaticFilesEntry));
};
