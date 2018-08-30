import cookieParser from "cookie-parser";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import log from "signale";
import { resolvers } from "./controller/Resolvers";
import PaypalRouter from "./PaypalAuth";
import Schema from "./Schema.gql";
import SpotifyRouter from "./SpotifyAuth";

try {
  const server = new GraphQLServer({
    typeDefs: Schema,
    resolvers
  });

  server.express.use(helmet());
  server.express.use(cookieParser());
  server.express.use("/spotify", SpotifyRouter);
  server.express.use("/paypal", PaypalRouter);

  server.start(() => log.start("Server is running on localhost:4000"));
} catch (e) {
  log.error(e);
  throw new Error(e);
}
