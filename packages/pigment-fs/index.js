const { Observable } = require("rxjs/Observable");
const { of } = require("rxjs/observable/of");
const { empty } = require("rxjs/observable/empty");
const { mergeMap, map, expand, filter } = require("rxjs/operators");
const fs = require("fs");
const path = require("path");
const mkdirpLib = require("mkdirp");
const chokidar = require("chokidar");

function exists(filePath) {
  return Observable.create(observer => {
    fs.exists(filePath, exists => {
      observer.next(exists);
      observer.complete();
    });
  });
}

function watch(paths) {
  return Observable.create(observer => {
    chokidar
      .watch(paths, { persistent: true })
      .on("raw", (event, path, details) => {
        observer.next({ event, path, details });
      });
  });
}

function readdir(dirPath) {
  return Observable.create(observer => {
    fs.readdir(dirPath, (e, files) => {
      if (e) return observer.error(e);

      files = files.map(file => path.join(dirPath, file));
      observer.next(files);
      observer.complete();
    });
  });
}

function readfile(filepath) {
  return Observable.create(observer => {
    fs.readFile(filepath, (e, file) => {
      if (e) return observer.error(e);

      const data = { filepath: filepath, file: file.toString() };
      observer.next(data);
      observer.complete();
    });
  });
}

function writefile(filePath, content, options = {}) {
  return Observable.create(observer => {
    fs.writeFile(filePath, content, options, e => {
      if (e) return observer.error(e);

      observer.next(filePath);
      observer.complete();
    });
  });
}

function stat(filePath) {
  return Observable.create(observer => {
    fs.stat(filePath, (e, stats) => {
      if (e) return observer.error(e);

      observer.next({ filepath: filePath, stats });
      observer.complete();
    });
  });
}

function mkdirp(path) {
  return Observable.create(observer => {
    mkdirpLib(path, e => {
      if (e) return observer.error(e);

      observer.next(path);
      observer.complete();
    });
  });
}

function getRecursiveFiles(inputDir$) {
  return inputDir$.pipe(
    mergeMap(dirpath => readdir(dirpath)),
    mergeMap(files => files), // flatten all files
    mergeMap(filepath => stat(filepath)),
    map(({ filepath, stats }) => ({
      filepath,
      stats,
      isDirectory: stats.isDirectory()
    })),
    expand(
      ({ filepath, stats, isDirectory }) =>
        isDirectory ? getRecursiveFiles(of(filepath)) : empty()
    ),
    filter(({ isDirectory }) => !isDirectory),
    map(({ isDirectory, filepath, stats }) => ({ filepath, stats }))
  );
}

function saveFiles(filesToSave$) {
  return filesToSave$.pipe(
    mergeMap(({ file, filepath }) => mkdirp(path.dirname(filepath))),
    map(() => ({ file, filepath })),
    mergeMap(({ file, filepath }) => writefile(filepath, file))
  );
}

function copyfile(sourcePath, destPath, recursive = false) {
  let file$;
  if (recursive) {
    file$ = getRecursiveFiles(of(sourcePath)).pipe(
      mergeMap(({ filepath }) =>
        copyfile(
          filepath,
          path.join(destPath, path.relative(sourcePath, filepath))
        )
      )
    );
  } else {
    file$ = mkdirp(path.dirname(destPath)).pipe(
      mergeMap(() =>
        Observable.create(observer => {
          const readStream = fs.createReadStream(sourcePath);
          const writeStream = fs.createWriteStream(destPath);

          writeStream.on("close", () => {
            observer.next(destPath);
            observer.complete();
          });
          writeStream.on("error", err => observer.error(err));
          readStream.on("error", err => observer.error(err));

          readStream.pipe(writeStream);
        })
      )
    );
  }

  return file$;
}

module.exports = {
  exists,
  watch,
  readdir,
  readfile,
  writefile,
  stat,
  mkdirp,
  getRecursiveFiles,
  saveFiles,
  copyfile
};
