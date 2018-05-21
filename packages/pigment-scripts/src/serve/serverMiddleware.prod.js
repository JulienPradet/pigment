const fs = require("fs");
const path = require("path");
const express = require("express");
const log = require("pigment-log")("SERVER");

module.exports = paths => {
  const serverStats = require(path.join(
    paths.build,
    "stats/stats.server.json"
  ));
  const clientStats = require(path.join(
    paths.build,
    "stats/stats.client.json"
  ));

  const makeSsrMiddleware = () => {
    const ssrFilename = path.join(
      paths.buildServer,
      serverStats.assetsByChunkName.ssr[0]
    );
    const ssrMiddleware = require(ssrFilename).default;

    const script = "/" + clientStats.assetsByChunkName.main[0];

    return ssrMiddleware({ script });
  };

  const makeGraphQLMiddleware = () => {
    const graphQLFilename = path.join(
      paths.buildServer,
      serverStats.assetsByChunkName.graphql[0]
    );
    const graphQLMiddleware = require(graphQLFilename).default;

    return graphQLMiddleware;
  };

  const router = express.Router();
  router.use(makeSsrMiddleware());
  router.use(makeGraphQLMiddleware());
  return router;
};
