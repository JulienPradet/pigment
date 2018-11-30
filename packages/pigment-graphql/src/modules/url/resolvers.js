const resolvers = {
  Query: {
    urls: (_, _2, { loader }) => loader.getUrls(),
    matchUrl: (_, { path }, { loader }) => loader.matchUrl(path)
  }
};

export default resolvers;
