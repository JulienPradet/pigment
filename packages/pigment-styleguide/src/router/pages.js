import loadableRoute from "@pigment/app/src/loadableRoute";

export default [
  loadableRoute({
    test: /^\/story\/([^!]+?)(?:!)?$/i,
    pathKeys: [
      {
        name: "story",
        prefix: "/",
        delimiter: "/",
        optional: false,
        repeat: false,
        partial: false,
        pattern: "[^\\/]+?"
      }
    ],
    routeComponent: () => import("../pages/StoryRoute.js"),
    filePath: "../pages/StoryRoute.js"
  }),
  loadableRoute({
    test: /^\/404(?:\/)?$/i,
    pathKeys: [],
    routeComponent: () => import("../pages/StoryNotFound.js"),
    filePath: "../pages/StoryNotFound.js"
  })
];
