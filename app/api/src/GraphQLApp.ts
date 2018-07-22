import { GraphQLServer } from "graphql-yoga";
import signale from "signale";
import { resolvers } from "./controller/Resolvers";

try {
  const server = new GraphQLServer({
    typeDefs: "./src/Schema/Schema.graphql",
    resolvers
  });
  server.start(() => signale.start("Server is running on localhost:4000"));
} catch (e) {
  signale.error(e);
  throw new Error(e);
}