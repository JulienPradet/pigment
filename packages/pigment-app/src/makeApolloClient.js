import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";

export default ({ ssr, fetch }) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: process.env.PUBLIC_URL + "graphql",
    fetch: fetch
  });

  const link = ApolloLink.from([errorLink, httpLink]);

  const cache = new InMemoryCache();
  if (!ssr) {
    cache.restore(window.__APOLLO_STATE__);
  }

  return new ApolloClient({
    ssrMode: true,
    cache: cache,
    link: link
  });
};
