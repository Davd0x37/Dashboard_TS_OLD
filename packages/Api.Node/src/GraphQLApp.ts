import cookieParser from "cookie-parser";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import log from "signale";
import PaypalRouter from "./components/Paypal/Router";
import SpotifyRouter from "./components/Spotify/Router";
import { resolvers } from "./graphql/Resolvers";
import Schema from "./graphql/Schema.gql";

try {
  const server = new GraphQLServer({
    typeDefs: Schema,
    resolvers
  });

  server.express.use(helmet());
  server.express.use(cookieParser());

  server.express.use("/spotify", SpotifyRouter);
  server.express.use("/paypal", PaypalRouter);

  server.start(
    {
      cors: {
        origin: "https://liquidash.pl",
        methods: ["POST", "GET"]
      },
      playground: process.env.NODE_ENV === "prod" ? false : undefined
    },
    () => log.start("Server is running on localhost:4000")
  );
} catch (e) {
  log.error(e);
  throw new Error(e);
}
