const express = require("express");
const clientMiddleware = require("./clientMiddleware");
const serverMiddleware = require("./serverMiddleware");
const log = require("@pigment/log")("SERVER");

const createAppRouter = compiler => {
  const router = express.Router();
  router.use(clientMiddleware(compiler));
  router.use(serverMiddleware(compiler));
  return router;
};

module.exports = compiler => {
  const app = express();
  app.use(createAppRouter(compiler));

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
