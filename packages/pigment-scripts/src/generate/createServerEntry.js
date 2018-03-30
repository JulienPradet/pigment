const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  return of(stripIndent`
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
  `).pipe(writeGeneratedFile(paths.serverEntry));
};
