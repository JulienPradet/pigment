const express = require("express");
const clientMiddleware = require("./clientMiddleware.dev");
const serverMiddleware = require("./serverMiddleware.dev");
const styleguideMiddleware = require("./styleguideMiddleware.dev");
const log = require("@pigment/log")("SERVER");

const createAppRouter = (paths, compiler) => {
  const router = express.Router();
  router.use(clientMiddleware(paths, compiler));
  router.use(styleguideMiddleware(paths, compiler));
  router.use(serverMiddleware(paths, compiler));
  return router;
};

module.exports = (paths, compiler) => {
  const app = express();
  app.use(createAppRouter(paths, compiler));

  const server = app.listen(
    {
      port: 3000,
      host: "0.0.0.0"
    },
    () => {
      log.message("success", "App available at http://localhost:3000/");
    }
  );

  return server;
};
