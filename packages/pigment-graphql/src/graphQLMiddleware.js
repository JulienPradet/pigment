import express from "express";
import bodyParser from "body-parser";
import gramps from "@gramps/gramps";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";

const graphQLMiddleware = grampsOptions => {
  const router = express.Router();

  const GraphQLOptions = gramps(grampsOptions);

  router.use(bodyParser.json());
  router.use("/graphql", graphqlExpress(GraphQLOptions));
  router.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

  return router;
};

export default graphQLMiddleware;
