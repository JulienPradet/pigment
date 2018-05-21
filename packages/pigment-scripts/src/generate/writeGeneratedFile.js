const fs = require("pigment-fs");
const path = require("path");
const { mergeMap } = require("rxjs/operators");
const prettier = require("prettier");

module.exports = filePath => content$ => {
  return fs.mkdirp(path.dirname(filePath)).pipe(
    mergeMap(() => content$),
    mergeMap(content => {
      return fs.writefile(filePath, prettier.format(content));
    })
  );
};
