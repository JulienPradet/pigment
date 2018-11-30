const loader = (moduleLoaders = []) => {
  moduleLoaders = moduleLoaders.filter(
    loader => typeof loader.matchUrl === "function"
  );

  const matchUrl = path => {
    return moduleLoaders.reduce(
      (matchPromise, moduleLoader) => {
        return matchPromise.then(currentMatch => {
          if (!currentMatch.generated) {
            return currentMatch;
          } else {
            return moduleLoader
              .matchUrl(path)
              .then(match => match || currentMatch);
          }
        });
      },
      Promise.resolve({
        generated: true,
        seoPath: path,
        pagePath: path
      })
    );
  };

  return {
    getUrls() {
      return Promise.all(
        moduleLoaders.map(moduleLoader => moduleLoader.getUrls())
      ).then(moduleUrls => moduleUrls.reduce((acc, curr) => [...acc, ...curr]));
    },
    matchUrl: matchUrl
  };
};

export default loader;
