module.exports = () => {
  process.env.NODE_ENV = "test";
  process.env.BABEL_ENV = "test";

  const jest = require("jest");
  const paths = require("../../config/paths");

  const runJest = (argv = []) => {
    if (
      !process.env.CI &&
      argv.indexOf("--coverage") === -1 &&
      argv.indexOf("--watchAll") === -1
    ) {
      argv.push("--watch");
      argv.push("--runInBand");
    }

    const config = {
      cacheDirectory: paths.cacheJest,
      rootDir: paths.src,
      transform: {
        "^.+\\.(js|jsx|mjs)$": require.resolve("./jest/babelTransform.js"),
        "^.+\\.(gql|graphql)$": require.resolve("jest-transform-graphql")
      }
    };
    argv.push("--config", JSON.stringify(config));

    jest.run(argv);
  };

  let argv = process.argv.slice(2);
  runJest(argv);

  process.on("unhandledRejection", err => {
    throw err;
  });
  process.on("SIGINT", () => {
    server.close();
  });
  process.on("SIGTERM", () => {
    process.exit(1);
  });
};
