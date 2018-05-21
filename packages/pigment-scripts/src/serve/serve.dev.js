const express = require("express");
const { Observable } = require("rxjs/Observable");
const { share } = require("rxjs/operators");
const clientMiddleware = require("./clientMiddleware.dev");
const serverMiddleware = require("./serverMiddleware.dev");
const styleguideMiddleware = require("./styleguideMiddleware.dev");
const log = require("pigment-log")("SERVER");

const createAppRouter = (paths, compiler) => {
  const compilerDone$ = Observable.create(observer => {
    compiler.plugin("done", stats => {
      observer.next(stats);
    });
  }).pipe(share());

  const router = express.Router();
  router.use(clientMiddleware(paths, compiler, compilerDone$));
  router.use(styleguideMiddleware(paths, compiler, compilerDone$));
  router.use(serverMiddleware(paths, compiler, compilerDone$));
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
