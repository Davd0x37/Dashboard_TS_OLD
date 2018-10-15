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

  const env = process.env.NODE_ENV;

  server.start(
    {
      cors: {
        origin: "https://liquidash.pl",
        methods: ["POST", "GET"]
      },
      ...(env === "prod" ? { playground: false } : { playground: "/" })
    },
    () => log.start(`Server is running!`)
  );
} catch (e) {
  log.error(e);
  throw new Error(e);
}
