const log = require("pigment-log")("SERVER");

module.exports = () => {
  process.env.NODE_ENV = "production";

  const paths = require("../../config/paths")();
  const server = require("../serve/serve.prod")(paths, () => {
    log.message("success", "App available at http://localhost:3000/");
  });
  server.on("close", () => {
    process.exit(0);
  });

  process.on("SIGINT", () => {
    server.close();
  });
  process.on("SIGTERM", () => {
    process.exit();
  });
};
