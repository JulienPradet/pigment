const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  return of(stripIndent`
    import graphQLMiddleware from '@pigment/graphql/src/graphQLMiddleware';

    export default graphQLMiddleware();
  `).pipe(writeGeneratedFile(paths.graphQLEntry));
};
