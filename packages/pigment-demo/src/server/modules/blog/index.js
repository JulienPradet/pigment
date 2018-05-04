import typeDefs from "./schema.gql";
import loader from "./loader";
import resolvers from "./resolvers";
import mocks from "./mocks";

export default {
  namespace: "Blog",
  loader: loader(),
  typeDefs,
  resolvers,
  mocks
};
