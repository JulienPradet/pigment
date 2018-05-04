import express from "express";
import bodyParser from "body-parser";
import gramps from "@gramps/gramps";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import urlModule from "./modules/url";

const graphQLMiddleware = (modulesFactory, endpoint, mock = false) => {
  const modules = [...modulesFactory];
  modules.push(urlModule(modules.map(({ loader }) => loader)));

  const dataSources = modules.map(({ loader, ...module }) => ({
    ...module,
    context: { loader: loader }
  }));

  const grampsOptions = {
    dataSources: [...dataSources],
    enableMockData: mock
  };

  const GraphQLOptions = gramps(grampsOptions);

  const router = express.Router();

  router.use(bodyParser.json());
  router.use("/graphql", graphqlExpress(GraphQLOptions));
  router.use("/graphiql", graphiqlExpress({ endpointURL: endpoint }));

  return router;
};

export default graphQLMiddleware;
