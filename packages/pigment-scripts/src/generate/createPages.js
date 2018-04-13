const path = require("path");
const fs = require("@pigment/fs");
const { of } = require("rxjs/observable/of");
const { interval } = require("rxjs/observable/interval");
const {
  first,
  filter,
  map,
  switchMap,
  debounceTime
} = require("rxjs/operators");
const pathToRegexp = require("path-to-regexp");
const writeGeneratedFile = require("./writeGeneratedFile");
const reduceObservable = require("./reduceObservable");
const { stripIndent } = require("common-tags");

const filePathToRoute = filePath => {
  let path = filePath;
  if (path.endsWith("/index.js")) {
    path = path.replace(/\/index\.[^/.]+$/, "");
  } else {
    path = path.replace(/\.[^/.]+$/, "");
  }

  if (path.length === 0) {
    path = "/";
  }
  return path;
};

const findPages = srcFolder => {
  const pagesFilePaths = [
    path.join(srcFolder, "pages", "/404.js"),
    path.join(srcFolder, "pages", "/index.js"),
    path.join(srcFolder, "pages", "/about.js"),
    path.join(srcFolder, "pages", "/posts/index.js"),
    path.join(srcFolder, "pages", "/posts/:post.js")
  ];

  return fs
    .getRecursiveFiles(of(path.join(srcFolder, "pages")))
    .pipe(
      map(({ filepath }) => filepath),
      filter(filepath => filepath.endsWith(".js"))
    );
};

const mapPageToDefinition = (pageFolder, importFrom) => pageFilePath => {
  const pagePath = path.relative(pageFolder, pageFilePath);
  const canonicalPagePath = `/` + pagePath;
  const importPath = path.join(
    path.relative(path.dirname(importFrom), pageFolder),
    canonicalPagePath
  );

  const route = filePathToRoute(canonicalPagePath);
  const keys = [];
  const regexp = pathToRegexp(route, keys);

  const webpackChunkName = pagePath.replace(/\//g, "--");

  return stripIndent`
    loadableRoute({
      test: ${regexp.toString()},
      pathKeys: ${JSON.stringify(keys)},
      routeComponent: () => import(/* webpackChunkName: "${webpackChunkName}" */ "${importPath}"),
      filePath: "${importPath}"
    })
  `;
};

const generatePages = (paths, pageFolder) => {
  return findPages(paths.src).pipe(
    map(mapPageToDefinition(pageFolder, paths.pagesIndex)),
    reduceObservable((acc, pageDefinition) => [...acc, pageDefinition], []),
    map(pagesDefinitions => {
      return stripIndent`
        /* eslint no-useless-escape: 0 */
        import loadableRoute from "@pigment/app/src/loadableRoute";

        const pages = [
          ${pagesDefinitions.join(",")}
        ];

        export default pages;
      `;
    }),
    writeGeneratedFile(paths.pagesIndex)
  );
};

module.exports = (paths, watch = false) => {
  const pageFolder = path.join(paths.src, "pages");
  return generatePages(paths, pageFolder).pipe(
    first(),
    switchMap(() =>
      fs
        .watch(pageFolder)
        .pipe(
          filter(
            ({ event, path, details }) =>
              event === "rename" && path.endsWith(".js")
          ),
          debounceTime(20),
          switchMap(() => generatePages(paths, pageFolder))
        )
    )
  );
};
