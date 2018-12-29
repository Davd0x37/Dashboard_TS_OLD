require("dotenv").config();
require("module-alias/register");

import cors from "@CFG/cors";
import { loadGQLSchema } from "@UTILS/fs";
import cookieParser from "cookie-parser";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import { resolve } from "path";
import { error, start } from "signale";
import { createConnection } from "typeorm";
import ServiceRouter from "./components/service/Router";
import { resolvers } from "./graphql/resolvers";

createConnection()
  .then(async (_: any) => {
    const env = process.env.NODE_ENV;

    // Create GraphQL server
    // @TODO: Fix importing schema
    const server = new GraphQLServer({
      typeDefs: loadGQLSchema(
        resolve(__dirname, "../../app/graphql/Schema.gql")
      ),
      resolvers
    });

    // Add middlewares and routes
    server.express
      .use(helmet())
      .use(cookieParser())
      .use("/services", ServiceRouter);

    // Start server with/out cors
    server.start(
      {
        ...(env === "prod"
          ? {
              cors: {
                origin: cors.origin,
                methods: cors.methods
              }
            }
          : {}),
        ...(env === "prod" ? { playground: false } : { playground: "/" })
      },
      () => start(`Server is running!`)
    );

    // await Mutations.updateUserData("", {
    //   id: "c9cd4319-1a19-4ad5-9987-366f3d4e14d6"
    // });
    // await Service.updateData(
    //   "c9cd4319-1a19-4ad5-9987-366f3d4e14d6",
    //   "spotify",
    //   "suck my legs1"
    // );

    // await AuthTokens.saveTokens("c9cd4319-1a19-4ad5-9987-366f3d4e14d6", "spotify",
    // {
    //   accessToken: "from static",
    //   tokenType: "OMG"
    // })
  })
  .catch((err: any) => error(err));
