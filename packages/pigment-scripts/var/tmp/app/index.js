import makeApp from "@pigment/app/src/makeApp";

const pages = [
  {
    /* eslint-disable */
    test: /^\/404(?:\/)?$/i,
    /* eslint-enable */
    pathKeys: [],
    Component: require("../../../../pigment-demo/src/pages/404.js").default,
    filePath: "src/pages/404.js"
  },
  {
    /* eslint-disable */
    test: /^\/(?:\/)?$/i,
    /* eslint-enable */
    pathKeys: [],
    Component: require("../../../../pigment-demo/src/pages/index.js").default,
    filePath: "src/pages/index.js"
  },
  {
    /* eslint-disable */
    test: /^\/about(?:\/)?$/i,
    /* eslint-enable */
    pathKeys: [],
    Component: require("../../../../pigment-demo/src/pages/about.js").default,
    filePath: "src/pages/about.js"
  },
  {
    /* eslint-disable */
    test: /^\/posts(?:\/)?$/i,
    /* eslint-enable */
    pathKeys: [],
    Component: require("../../../../pigment-demo/src/pages/posts/index.js")
      .default,
    filePath: "src/pages/posts/index.js"
  },
  {
    /* eslint-disable */
    test: /^\/posts\/([^\/]+?)(?:\/)?$/i,
    /* eslint-enable */
    pathKeys: [
      {
        name: "post",
        prefix: "/",
        delimiter: "/",
        optional: false,
        repeat: false,
        partial: false,
        pattern: "[^\\/]+?"
      }
    ],
    Component: require("../../../../pigment-demo/src/pages/posts/:post.js")
      .default,
    filePath: "src/pages/posts/:post.js"
  }
];

const App = makeApp(pages);

export default App;
