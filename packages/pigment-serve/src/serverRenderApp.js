const React = require("react");
const { renderToString } = require("react-dom/server");

const serverRenderApp = App => {
  return (req, res, next) => {
    res.send(renderToString(<App />));
  };
};

module.exports = serverRenderApp;
