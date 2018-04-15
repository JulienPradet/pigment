const posts = new Array(23).fill(null).map((_, index) => ({
  id: `${index}`,
  path: `/seo-post-${index}`,
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
    load(id) {
      return posts.find(post => post.id === id);
    },
    matchUrl(path) {
      const post = posts.find(post => post.path === path);
      if (post) {
        return {
          seoPath: post.path,
          pagePath: `/posts/${post.id}`
        };
      }
    }
  };
};

export default loader;
