module.exports = args => {
  process.env.NODE_ENV = "production";

  const paths = require("../config/paths")();
  const server = require("../src/serve/serve.prod")(paths);
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
