const resolvers = {
  Query: {
    matchUrl: (_, { path }, { loader }) => loader.matchUrl(path)
  }
};

export default resolvers;
