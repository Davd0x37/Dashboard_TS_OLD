require("dotenv").config();
require("module-alias/register");

import { ServiceRouter } from "@/components/service";
import cors from "@/config/cors";
import { resolvers } from "@/graphql";
import { loadGQLSchema } from "@/utils/fs";
import cookieParser from "cookie-parser";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import { resolve } from "path";
import { fatal, start } from "signale";
import { createConnection } from "typeorm";

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
  })
  .catch((err: any) => fatal(err));
