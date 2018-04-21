const loadableRoute = ({ test, pathKeys, routeComponent, filePath }) => {
  let loadingPromise = null;
  let loadedComponent = null;

  const loadComponent = () => {
    if (!loadingPromise) {
      loadingPromise = routeComponent()
        .then(module => module.default)
        .then(Component => {
          loadedComponent = Component;
          return loadedComponent;
        });
    }

    return loadingPromise;
  };

  return {
    test: test,
    pathKeys: pathKeys,
    loadComponent: loadComponent,
    getComponent: () => loadedComponent,
    filePath: filePath
  };
};

export default loadableRoute;
