// require("dotenv").config();
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
// import { unseal } from "./components/vault";
import { igniteConnection } from "./CreateConnection";
import { readFileSync } from "fs";
// import { firstRun } from "./Setup";
const typeDefs = `
schema {
  query: Query
  mutation: Mutation
}

type Query {
  # Authenticate user by his login and password
  authenticateUser(login: String!, password: String!): User
  # Fetch new data from service
  # @HINT: Maybe add selecting services?
  updateUserData(session_id: String!): [Service]
}

type Mutation {
  addUser(data: UserInput!): Boolean!

  addService(data: ServiceInput!, update: Boolean): Boolean!
  # Update token
  updateBasicToken(
    session_id: String!
    serviceName: String!
    token: String!
  ): Boolean!
}

type User {
  session_id: String!
  avatar: String
  email: String!
  isOnline: Boolean!
  registerDate: String!
  services: [Service]
  avServices: [String]
}

input UserInput {
  avatar: String
  email: String!
  isOnline: Boolean!
  login: String!
  password: String!
}

input ServiceInput {
  serviceName: String!
  apiURL: String!
  tokenService: String
  authorizeURL: String
  userScopes: [String!]
  clientID: String
  clientSecret: String
  paths: [String!]
  requestedData: [String!]
  tokenType: String!
  redirectURL: String
}

type Service {
  serviceName: String!
  data: String!
}

`;
igniteConnection()
  .then(async (_: Connection) => {
    // await firstRun();
    // await unseal();

    // const env = process.env.NODE_ENV;
    const env = "production";
    // Create GraphQL server
    const server = new GraphQLServer({
      typeDefs, // : loadGQLSchema(resolve("app/graphql/Schema.gql")),
      resolvers
    });

    server.express.set("view engine", "pug");
    server.express.set("views", resolve("app/views"));

    // Add middlewares and routes
    server.express
      .use(helmet())
      .use(cookieParser())
      .use("/services", ServiceRouter);
    const privateKey = readFileSync("privkey.pem");
    const certificate = readFileSync("cert.pem");
    // Start server with/out cors
    server.start(
      {
        cors: {
          origin: "*"
        },
        // ...(env === "production" && {
        //   cors: {
        //     origin: cors.origin,
        //     methods: cors.methods
        //   }
        // }),
        // playground: env === "production" ? false : "/"
        https: {
          cert: certificate,
          key: privateKey
        }
      },
      () => start(`Server is running!`)
    );
  })
  .catch((err: any) => fatal(err));
