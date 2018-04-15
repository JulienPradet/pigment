import typeDefs from "./schema.gql";
import loader from "./loader";
import resolvers from "./resolvers";

export default moduleLoaders => ({
  namespace: "Url",
  loader: loader(moduleLoaders),
  typeDefs,
  resolvers
});
