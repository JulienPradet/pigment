const path = require("path");
const { of } = require("rxjs/observable/of");
const { stripIndent } = require("common-tags");
const writeGeneratedFile = require("./writeGeneratedFile");

module.exports = paths => {
  const pagesPath = path.relative(
    path.dirname(paths.clientEntry),
    paths.pagesIndex
  );

  const cacheRedirectsPath = path.relative(
    path.dirname(paths.clientEntry),
    path.join(paths.src, "client/graphql/cacheRedirects")
  );

  return of(
    stripIndent`
      import pages from "${pagesPath}";
      import cacheRedirects from "${cacheRedirectsPath}";
      import clientRenderApp from "@pigment/app/src/clientRenderApp";
      import makeApolloClient from "@pigment/app/src/makeApolloClient";

      const apolloClient = makeApolloClient({
        fetch: fetch,
        cacheRedirects: cacheRedirects
      })

      clientRenderApp(pages, apolloClient)

      if (module.hot) {
        module.hot.accept("${pagesPath}", () => {
          const pages = require("${pagesPath}").default;
          clientRenderApp(pages, apolloClient)
        });
      }
    `
  ).pipe(writeGeneratedFile(paths.clientEntry));
};
