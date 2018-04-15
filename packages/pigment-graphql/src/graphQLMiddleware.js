import express from "express";
import bodyParser from "body-parser";
import gramps from "@gramps/gramps";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import urlModule from "./modules/url";

const graphQLMiddleware = appModules => {
  const router = express.Router();

  const modules = [
    urlModule(appModules.map(({ loader }) => loader)),
    ...appModules
  ];

  const dataSources = modules.map(({ loader, ...module }) => ({
    ...module,
    context: { loader: loader }
  }));

  const grampsOptions = {
    dataSources: [...dataSources]
  };

  const GraphQLOptions = gramps(grampsOptions);

  router.use(bodyParser.json());
  router.use("/graphql", graphqlExpress(GraphQLOptions));
  router.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

  return router;
};

export default graphQLMiddleware;
