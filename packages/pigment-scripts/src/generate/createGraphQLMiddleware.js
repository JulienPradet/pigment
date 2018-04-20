const path = require("path");
const fs = require("@pigment/fs");
const { from } = require("rxjs/observable/from");
const { filter, map, mergeMap } = require("rxjs/operators");
const { stripIndent } = require("common-tags");
const reduceObservable = require("@pigment/utils/src/reduceObservable");
const writeGeneratedFile = require("./writeGeneratedFile");

const directoriesOnly = () => source$ =>
  source$.pipe(
    mergeMap(file => fs.stat(file)),
    map(({ filepath, stats }) => (stats.isDirectory() ? filepath : null)),
    filter(file => file !== null)
  );

const findModules = modulesFolder => {
  return fs
    .readdir(modulesFolder)
    .pipe(
      mergeMap(files => from(files)),
      directoriesOnly(),
      reduceObservable((acc, file) => [...acc, file], [])
    );
};

module.exports = paths => {
  return findModules(paths.graphqlModules).pipe(
    map(
      modules => `[
        ${modules
          .map(module => `require(${JSON.stringify(module)}).default`)
          .join(",")}
      ]`
    ),
    map(
      modules => stripIndent`
        import graphQLMiddleware from '@pigment/graphql/src/graphQLMiddleware';

        export default graphQLMiddleware(${modules});
      `
    ),
    writeGeneratedFile(paths.graphQLEntry)
  );
};
