const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const compression = require("compression");
const clientMiddleware = require("./clientMiddleware.prod");
const serverMiddleware = require("./serverMiddleware.prod");
const styleguideMiddleware = require("./styleguideMiddleware.prod");
const fetch = require("isomorphic-fetch");

const port = 3000;
const host = "0.0.0.0";

const createAppRouter = paths => {
  const router = express.Router();
  router.use(clientMiddleware(paths));
  router.use(styleguideMiddleware(paths));
  router.use(serverMiddleware(paths));
  return router;
};

const getUrls = paths => {
  return fetch(`http://${host}:${port}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        urls
      }`
    })
  })
    .then(response => response.json())
    .then(response => response.data.urls)
    .then(urls => [
      ...require(paths.pagesServerIndex)
        .filter(page => page.pathKeys.length === 0)
        .map(page => page.path),
      ...urls
    ]);
};

const fetchUrl = url => {
  return fetch(`http://${host}:${port}${url}`).then(response => response.body);
};

const saveStream = filepath => stream => {
  return new Promise((resolve, reject) => {
    mkdirp(path.dirname(filepath), err => {
      if (err) {
        reject(err);
        return;
      }

      const writeStream = stream.pipe(fs.createWriteStream(filepath), {
        end: true
      });
      writeStream.on("finish", function() {
        resolve(filepath);
      });
    });
  });
};

const urlToFilePath = url => {
  if (url !== "/404") {
    return path.join(url, "index.html");
  } else {
    return `${url}.html`;
  }
};

module.exports = (paths, onReady) => {
  const app = express();

  app.use(compression());
  app.use(createAppRouter(paths));

  const server = app.listen(
    {
      port: port,
      host: host
    },
    () => {
      getUrls(paths)
        .then(urls => {
          return Promise.all(
            urls.map(url =>
              fetchUrl(url).then(
                saveStream(path.join(paths.buildClient, urlToFilePath(url)))
              )
            )
          );
        })
        .then(() => {
          server.close();
          if (onReady) {
            onReady();
          }
        });
    }
  );

  return server;
};
