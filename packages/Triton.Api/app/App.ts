// tslint:disable
require("module-alias/register");

import cookieParser from "cookie-parser";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import signale from "signale";
import PaypalRouter from "./components/Paypal/Router";
import SpotifyRouter from "./components/Spotify/Router";
import { resolvers } from "./graphql/Resolvers";
// @ts-ignore
import Schema from "./graphql/Schema.gql";

try {
  const server = new GraphQLServer({
    typeDefs: Schema,
    resolvers
  });

  const use = server.express
    .use(helmet())
    .use(cookieParser())
    .use("/spotify", SpotifyRouter)
    .use("/paypal", PaypalRouter);

  // const env = process.env.NODE_ENV;
  const start = server.start(
    // {
    //   cors: {
    //     origin: "https://liquidash.pl",
    //     methods: ["POST", "GET"]
    //   },
    //   ...(env === "prod" ? { playground: false } : { playground: "/" })
    // },
    () => signale.start(`Server is running!`)
  );
} catch (e) {
  throw signale.error("GraphQLApp ------", e);
}
