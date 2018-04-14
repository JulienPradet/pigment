const resolvers = {
  Query: {
    blog: () => ({})
  },
  Blog: {
    posts: (_, { from = 0, to = 10 }, { loader }) => {
      return loader.loadList(from, to);
    },
    post: (_, { path }, { loader }) => {
      return loader.load(path);
    }
  }
};

export default resolvers;
