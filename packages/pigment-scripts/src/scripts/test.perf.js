const path = require("path");
const paths = require("../config/paths");
const log = require("@pigment/log")("PERF");
const { stripIndent } = require("common-tags");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const perfConfig = require("lighthouse/lighthouse-core/config/perf.json");

const budget = {
  performance: 95
};

module.exports = () => {
  process.env.NODE_ENV = "production";

  const paths = require("../../config/paths")();
  log.message("info", "Launching example server...");
  const server = require("../serve/serve.prod")(paths, async () => {
    log.message("info", "Launching browser...");

    const opts = {
      chromeFlags: ["--headless"]
    };
    const chrome = await chromeLauncher.launch(opts);

    log.message("info", "Calculating scores...");
    const result = await lighthouse(
      "http://localhost:3000/",
      {
        ...opts,
        port: chrome.port
      },
      perfConfig
    );
    chrome.kill();

    const audits = result.audits;
    const failedAudits = Object.keys(audits).filter(
      name => audits[name].score !== true && audits[name].score !== 100
    );
    failedAudits.forEach(name => {
      const { helpText, description, score, displayValue } = audits[name];
      log.message(
        "warn",
        stripIndent`
            ${description}: ${displayValue}
            Score: ${score}
            ${helpText}
          `
      );
    });

    if (result.score < budget.performance) {
      log.message(
        "error",
        stripIndent`
            Performance budget failed! (Score: ${result.score.toFixed(1)})
            Expected >= ${budget.performance}
          `
      );
      server.close();
      process.exit(1);
    } else {
      log.message(
        "success",
        `Performance budget achieved! (Score: ${result.score.toFixed(1)})`
      );
      process.exit(0);
    }
  });

  process.on("SIGINT", () => {
    server.close();
  });
  process.on("SIGTERM", () => {
    process.exit(1);
  });
};
