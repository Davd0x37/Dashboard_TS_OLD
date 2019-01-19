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
import { Connection } from "typeorm";
import { unseal } from "./components/vault";
import { igniteConnection } from "./CreateConnection";
import { firstRun } from "./Setup";
import { ApiTokens } from "./entity/ApiTokens";

igniteConnection()
  .then(async (_: Connection) => {

    const req = await ApiTokens.find()
    const res = req.find((val) => val.serviceName === "LELELLE")
    console.log(res)
    // await firstRun();
    // await unseal();

    // const env = process.env.NODE_ENV;
    // // Create GraphQL server
    // const server = new GraphQLServer({
    //   typeDefs: loadGQLSchema(resolve("app/graphql/Schema.gql")),
    //   resolvers
    // });

    // server.express.set("view engine", "pug");
    // server.express.set("views", resolve("app/views"));

    // // Add middlewares and routes
    // server.express
    //   .use(helmet())
    //   .use(cookieParser())
    //   .use("/services", ServiceRouter);

    // // Start server with/out cors
    // server.start(
    //   {
    //     ...(env === "prod" && {
    //       cors: {
    //         origin: cors.origin,
    //         methods: cors.methods
    //       }
    //     }),
    //     playground: env === "prod" ? false : "/"
    //   },
    //   () => start(`Server is running!`)
    // );
  })
  .catch((err: any) => fatal(err));
