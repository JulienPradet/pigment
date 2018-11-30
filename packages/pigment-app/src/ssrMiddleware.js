import express from "express";
import { renderPage } from "./renderPage";

const ssrMiddleware = (Document, pages, cacheRedirects) => ({ script }) => {
  const router = express.Router();

  router.get("*", (req, res, next) => {
    renderPage({
      Document,
      pages,
      cacheRedirects,
      script,
      url: req.originalUrl
    })
      .then(renderStream => renderStream.pipe(res))
      .catch(error => {
        console.log(error);
        res.status(500);
        res.send(":/");
      });
  });

  return router;
};

export { ssrMiddleware };
