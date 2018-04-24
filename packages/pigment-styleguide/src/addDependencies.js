/* global __webpack_require__ */
const nodeModulesRegexp = /node_modules/;
const isNodeModules = dependency => nodeModulesRegexp.test(dependency);

export default stories => {
  let mapModuleToStoriesDependingOnIt = new Map();
  let parsedDependencies = new Set();

  const parseDependency = (story, dependency, depth = 2) => {
    if (depth <= 0) {
      return;
    }

    parsedDependencies.add(dependency);

    __webpack_require__.c[dependency].children
      .filter(dependency => !isNodeModules(dependency))
      .forEach(child => {
        if (!mapModuleToStoriesDependingOnIt.has(child)) {
          mapModuleToStoriesDependingOnIt.set(child, []);
        }
        mapModuleToStoriesDependingOnIt.set(
          child,
          mapModuleToStoriesDependingOnIt.get(child).concat(story)
        );
        parseDependency(story, child, depth - 1);
      });
  };

  for (let story of stories.values()) {
    story.dependencies
      .filter(dependency => !isNodeModules(dependency))
      .forEach(dependency => {
        if (!parsedDependencies.has(dependency)) {
          parseDependency(story, dependency);
        }
      });
  }

  for (let story of stories.values()) {
    story.dependencies.forEach(dependency => {
      if (mapModuleToStoriesDependingOnIt.has(dependency)) {
        mapModuleToStoriesDependingOnIt.get(dependency).forEach(otherStory => {
          if (otherStory.id !== story.id) {
            otherStory.addDependsOn(story);
            story.addReliesOn(otherStory);
          }
        });
      }
    });
  }

  return Promise.resolve(stories);
};
