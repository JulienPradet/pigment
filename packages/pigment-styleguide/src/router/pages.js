import loadableRoute from "pigment-app/src/loadableRoute";

export default [
  loadableRoute({
    test: /^\/_pigment\/styleguide\/(?:\/)?$/i,
    pathKeys: [],
    routeComponent: () => import("../pages/Home.js"),
    filePath: "../pages/Home.js"
  }),
  loadableRoute({
    test: /^\/_pigment\/styleguide\/story(?:\/)?$/i,
    pathKeys: [],
    routeComponent: () => import("../pages/Story.js"),
    filePath: "../pages/Story.js"
  }),
  loadableRoute({
    test: /^\/_pigment\/styleguide\/feature(?:\/)?$/i,
    pathKeys: [],
    routeComponent: () => import("../pages/Feature.js"),
    filePath: "../pages/Feature.js"
  }),
  loadableRoute({
    test: /^\/_pigment\/styleguide\/iframe(?:\/)?$/i,
    pathKeys: [],
    routeComponent: () => import("../pages/StandaloneFeature.js"),
    filePath: "../pages/StandaloneFeature.js"
  }),
  loadableRoute({
    test: /^\/404(?:\/)?$/i,
    pathKeys: [],
    routeComponent: () => import("../pages/StoryNotFound.js"),
    filePath: "../pages/StoryNotFound.js"
  })
];
