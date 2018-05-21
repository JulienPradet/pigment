import path from "path";
import fs from "pigment-fs";
import { of } from "rxjs/observable/of";
import { mergeMap } from "rxjs/operators/mergeMap";
import { map } from "rxjs/operators/map";
import remark from "remark";
import recommended from "remark-preset-lint-recommended";
import html from "remark-html";
import matter from "gray-matter";
import reduceObservable from "pigment-utils/src/reduceObservable";

const processor = remark()
  .use(recommended)
  .use(html);

const fileLoader = rootDir => {
  let _list;

  const fetchList = () => {
    return fs.getRecursiveFiles(of(rootDir)).pipe(
      map(({ filepath }) => filepath),
      mergeMap(filepath => fs.readfile(filepath)),
      mergeMap(
        ({ filepath, file }) =>
          new Promise((resolve, reject) => {
            const { data, content } = matter(file);
            processor.process(content, function(error, file) {
              resolve({
                id: path.relative(rootDir, filepath),
                path: data.path,
                title: data.title,
                content: String(file)
              });
            });
          })
      ),
      reduceObservable((list, item) => [...list, item], [])
    );
  };

  const getList = () => {
    if (_list) {
      return Promise.resolve(_list);
    } else {
      return fetchList()
        .toPromise()
        .then(list => {
          _list = list;
          return list;
        });
    }
  };

  const getItemByAttribute = (attribute, value) => {
    return getList().then(list => list.find(item => item[attribute] === value));
  };

  const getItemById = value => getItemByAttribute("id", value);

  return {
    getList,
    getItemByAttribute,
    getItemById
  };
};

export default fileLoader;
