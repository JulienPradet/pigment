const posts = new Array(23).fill(null).map((_, index) => ({
  path: `/posts/${index}`,
  title: `Post ${index}`,
  content: `Hello post ${index}!`
}));

const loader = () => {
  return {
    loadList(from, to) {
      if (from < 0) {
        from = 0;
      }
      if (to < from) {
        to = from;
      }
      return posts.slice(from, to);
    },
    load(path) {
      return posts.find(post => post.path === path);
    }
  };
};

export default loader;
