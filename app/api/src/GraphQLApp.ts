import cookieParser from "cookie-parser";
import { GraphQLServer } from "graphql-yoga";
import log from "signale";
import { resolvers } from "./controller/Resolvers";
import PaypalRouter from "./PaypalAuthenticate";
import Schema from "./Schema/Schema.graphql";
import SpotifyRouter from "./SpotifyAuthenticate";

try {
  const server = new GraphQLServer({
    typeDefs: Schema,
    resolvers
  });

  server.express.use(cookieParser());
  server.express.use("/spotify", SpotifyRouter);
  server.express.use("/paypal", PaypalRouter);

  server.start(() => log.start("Server is running on localhost:4000"));
} catch (e) {
  log.error(e);
  throw new Error(e);
}
