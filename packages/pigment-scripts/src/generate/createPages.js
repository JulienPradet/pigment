const fs = require("@pigment/fs");
const path = require("path");
const { mergeMap } = require("rxjs/operators");
const { stripIndent } = require("common-tags");
const prettier = require("prettier");
const pathToRegexp = require("path-to-regexp");

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

module.exports = paths => {
  const pagesFilePaths = [
    path.join(paths.src, "pages", "/404.js"),
    path.join(paths.src, "pages", "/index.js"),
    path.join(paths.src, "pages", "/about.js"),
    path.join(paths.src, "pages", "/posts/index.js"),
    path.join(paths.src, "pages", "/posts/:post.js")
  ];

  const pagesDefinitions = pagesFilePaths
    .map(
      filePath => `/` + path.relative(path.join(paths.src, "pages"), filePath)
    )
    .map((filePath, index) => {
      const route = filePathToRoute(filePath);
      const keys = [];
      const regexp = pathToRegexp(route, keys);

      const importPath = path.relative(
        path.dirname(paths.pagesIndex),
        path.join(paths.src, "pages")
      );

      return `
        {
          /* eslint-disable */
          test: ${regexp.toString()},
          /* eslint-enable */
          pathKeys: ${JSON.stringify(keys)},
          Component: require("${importPath}${filePath}").default,
          filePath: "${importPath}${filePath}"
        }
      `;
    });

  return fs.mkdirp(path.dirname(paths.pagesIndex)).pipe(
    mergeMap(() => {
      return fs.writefile(
        paths.pagesIndex,
        prettier.format(stripIndent`
          const pages = [
            ${pagesDefinitions.join(",")}
          ];

          export default pages;
        `)
      );
    })
  );
};
