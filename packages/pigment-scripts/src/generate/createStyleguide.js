const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  return of(
    stripIndent`
      import renderStyleguide from "@pigment/styleguide/src/renderStyleguide";

      renderStyleguide()
    `
  ).pipe(writeGeneratedFile(paths.styleguideEntry));
};
