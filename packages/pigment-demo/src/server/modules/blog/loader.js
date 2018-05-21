import path from "path";
import fileLoader from "pigment-graphql/src/helpers/fileLoader";

const postsDirname = path.resolve(
  __dirname,
  path.join("../../../../content/posts")
);

const { getList, getItemByAttribute, getItemById } = fileLoader(postsDirname);

const loader = () => {
  return {
    loadList(from, to) {
      if (from < 0) {
        from = 0;
      }
      if (to < from) {
        to = from;
      }
      return getList().then(posts => posts.slice(from, to));
    },
    load(id) {
      return getItemById(id);
    },
    matchUrl(path) {
      return getItemByAttribute("path", path).then(post => {
        if (!post) {
          return null;
        }
        return {
          seoPath: post.path,
          pagePath: `/posts/${post.id}`
        };
      });
    }
  };
};

export default loader;
