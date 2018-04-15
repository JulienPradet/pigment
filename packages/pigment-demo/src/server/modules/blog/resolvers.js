const resolvers = {
  Query: {
    blog: () => ({})
  },
  Blog: {
    posts: (_, { from = 0, to = 10 }, { loader }) => {
      return loader.loadList(from, to);
    },
    post: (_, { id }, { loader }) => {
      return loader.load(id);
    }
  }
};

export default resolvers;
