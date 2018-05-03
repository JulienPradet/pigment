const express = require("express");
const compression = require("compression");
const clientMiddleware = require("./clientMiddleware.prod");
const serverMiddleware = require("./serverMiddleware.prod");
const styleguideMiddleware = require("./styleguideMiddleware.prod");

const createAppRouter = paths => {
  const router = express.Router();
  router.use(clientMiddleware(paths));
  router.use(styleguideMiddleware(paths));
  router.use(serverMiddleware(paths));
  return router;
};

module.exports = (paths, onReady) => {
  const app = express();

  app.use(compression());
  app.use(createAppRouter(paths));

  const server = app.listen(
    {
      port: 3000,
      host: "0.0.0.0"
    },
    () => {
      if (typeof onReady === "function") {
        onReady(app);
      }
    }
  );

  return server;
};
