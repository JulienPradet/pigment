import React from "react";
import loadableRoute from "@pigment/app/src/loadableRoute";

const getStoriesPages = stories => {
  let pages = [];
  for (let [, story] of stories.entries()) {
    const cleanedPath = story.id.replace(/\./, "\\.").replace(/\//, "\\/");
    const regexp = new RegExp(`^${cleanedPath}(?:\\/)?$`, "i");

    pages.push(
      loadableRoute({
        test: regexp,
        pathKeys: [],
        routeComponent: () =>
          import("./StoryRoute").then(module => {
            const StoryRoute = module.default;
            const Component = () => <StoryRoute story={story} />;
            Component.layout = StoryRoute.layout;
            return Component;
          }),
        filePath: "./StoryRoute.js"
      })
    );
  }

  return pages;
};

const getPagesFromStories = stories => {
  const storiesPages = getStoriesPages(stories);

  const notFoundStoryPage = loadableRoute({
    test: /^\/404(?:\/)?$/i,
    pathKeys: [],
    routeComponent: () => import("./StoryNotFound.js"),
    filePath: "./StoryNotFound.js"
  });

  return Promise.resolve([...storiesPages, notFoundStoryPage]);
};

export default getPagesFromStories;
