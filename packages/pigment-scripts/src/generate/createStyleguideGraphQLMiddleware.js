const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  const modulesPath = path.relative(
    path.dirname(paths.styleguideGraphQLEntry),
    paths.graphQLModulesEntry
  );

  return of(stripIndent`
    import modules from "./${modulesPath}";
    import graphQLMiddleware from "@pigment/graphql/src/graphQLMiddleware";

    export default graphQLMiddleware(modules,"/_pigment/styleguide/graphql", true);
  `).pipe(writeGeneratedFile(paths.styleguideGraphQLEntry));
};
