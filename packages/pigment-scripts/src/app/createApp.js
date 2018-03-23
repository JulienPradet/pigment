const fs = require("@pigment/fs");
const path = require("path");
const { mergeMap } = require("rxjs/operators");
const { stripIndent } = require("common-tags");
const prettier = require("prettier");

module.exports = paths => {
  return fs.mkdirp(path.dirname(paths.appIndex)).pipe(
    mergeMap(() => {
      return fs.writefile(
        paths.appIndex,
        prettier.format(stripIndent`
          import makeApp from '@pigment/app/src/makeApp';

          const pages = [
            {
              route: "/404",
              Component: require("../../../src/pages/404.js").default,
              filePath: "src/pages/404.js"
            },
            {
              route: "/",
              Component: require("../../../src/pages/index.js").default,
              filePath: "src/pages/index.js"
            },
            {
              route: "/about",
              Component: require("../../../src/pages/about.js").default,
              filePath: "src/pages/404.js"
            },
            {
              route: "/posts",
              Component: require("../../../src/pages/posts/index.js").default,
              filePath: "src/pages/posts/index.js"
            },
            {
              route: "/posts/:post",
              Component: require("../../../src/pages/posts/:post.js").default,
              filePath: "src/pages/posts/:post.js"
            }
          ];

          const App = makeApp(pages);

          export default App;
        `)
      );
    })
  );
};
