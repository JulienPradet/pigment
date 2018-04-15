const loader = (moduleLoaders = []) => {
  moduleLoaders = moduleLoaders.filter(
    loader => typeof loader.matchUrl === "function"
  );

  return {
    matchUrl(path) {
      for (var moduleLoader of moduleLoaders) {
        const match = moduleLoader.matchUrl(path);
        if (match) {
          return match;
        }
      }
    }
  };
};

export default loader;
