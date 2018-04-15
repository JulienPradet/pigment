const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  return of(stripIndent`
    import pages from "./${path.relative(
      path.dirname(paths.ssrEntry),
      paths.pagesIndex
    )}";
    import Document from "./${path.relative(
      path.dirname(paths.ssrEntry),
      path.join(paths.src, "Document.js")
    )}";
    import cacheRedirects from "./${path.relative(
      path.dirname(paths.ssrEntry),
      path.join(paths.src, "client/graphql/cacheRedirects.js")
    )}";
    import {ssrMiddleware} from "@pigment/app/src/ssrMiddleware";

    export default ssrMiddleware(Document, pages, cacheRedirects);
  `).pipe(writeGeneratedFile(paths.ssrEntry));
};
