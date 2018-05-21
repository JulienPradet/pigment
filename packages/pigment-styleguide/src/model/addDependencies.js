/* global __webpack_require__ */
import { Map, Set } from "immutable";
const nodeModulesRegexp = /node_modules/;
const isNodeModules = dependency => nodeModulesRegexp.test(dependency);

export default stories => {
  let storiesToDependencies = new Map();
  let parsedDependencies = new Set();

  const parseDependency = (story, dependency, depth = 2) => {
    if (depth <= 0) {
      return;
    }

    parsedDependencies.add(dependency);

    __webpack_require__.c[dependency].children
      .filter(dependency => !isNodeModules(dependency))
      .forEach(child => {
        if (!storiesToDependencies.has(child)) {
          storiesToDependencies = storiesToDependencies.set(child, []);
        }
        storiesToDependencies = storiesToDependencies.set(
          child,
          storiesToDependencies.get(child).concat(story)
        );
        parseDependency(story, child, depth - 1);
      });
  };

  stories.forEach(story =>
    story.dependencies
      .filter(dependency => !isNodeModules(dependency))
      .forEach(dependency => {
        if (!parsedDependencies.has(dependency)) {
          parseDependency(story, dependency);
        }
      })
  );

  stories.forEach(story =>
    story.dependencies.forEach(dependency => {
      if (storiesToDependencies.has(dependency)) {
        storiesToDependencies.get(dependency).forEach(otherStory => {
          if (otherStory.id !== story.id) {
            otherStory.addDependsOn(story);
            story.addReliesOn(otherStory);
          }
        });
      }
    })
  );

  return Promise.resolve(stories);
};
