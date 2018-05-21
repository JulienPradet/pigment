const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  const modulesPath = path.relative(
    path.dirname(paths.graphQLEntry),
    paths.graphQLModulesEntry
  );

  return of(stripIndent`
    import modules from "./${modulesPath}";
    import graphQLMiddleware from "pigment-graphql/src/graphQLMiddleware";

    export default graphQLMiddleware(modules, "/graphql");
  `).pipe(writeGeneratedFile(paths.graphQLEntry));
};
