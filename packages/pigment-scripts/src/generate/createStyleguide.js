const path = require("path");
const fs = require("pigment-fs");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");
const reduceObservable = require("pigment-utils/src/reduceObservable");
const { of } = require("rxjs/observable/of");
const {
  first,
  filter,
  map,
  switchMap,
  debounceTime
} = require("rxjs/operators");

const findStories = storiesFolder => {
  return fs
    .getRecursiveFiles(of(storiesFolder))
    .pipe(
      map(({ filepath }) => filepath),
      filter(filepath => /__stories__.+\.js$|\.story\.js$/.test(filepath))
    );
};

const generateStyleguide = paths => {
  return findStories(paths.stories).pipe(
    map(filepath => {
      const importPath = path.relative(
        path.dirname(paths.styleguideEntry),
        filepath
      );

      return `require("${importPath}")`;
    }),
    reduceObservable((acc, pageDefinition) => [...acc, pageDefinition], []),
    map(
      storiesDefinitions =>
        stripIndent`
        import renderStyleguide from "pigment-styleguide/src/renderStyleguide";

        const stories = [
          ${storiesDefinitions.join(",")}
        ];

        renderStyleguide(stories);
      `
    ),
    writeGeneratedFile(paths.styleguideEntry)
  );
};

module.exports = (paths, watch = false) => {
  if (watch) {
    return generateStyleguide(paths).pipe(
      first(),
      switchMap(() =>
        fs
          .watch(paths.stories)
          .pipe(
            filter(
              ({ event, path, details }) =>
                event === "rename" && path.endsWith(".js")
            ),
            debounceTime(20),
            switchMap(() => generateStyleguide(paths))
          )
      )
    );
  } else {
    return generateStyleguide(paths);
  }
};
