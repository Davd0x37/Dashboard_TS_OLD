import dotenv from "dotenv"
dotenv.config()

import { graphiqlExpress, graphqlExpress } from "apollo-server-express"
import bodyParser from "body-parser"
import morgan from "morgan"
import Database from './lib/Database';
import Server from "./lib/Server";

const db = new Database()
db.connect()

Server.middleware([
  bodyParser.json(),
  morgan('dev')
])


Server.listen()

// DServer.use(
//   "/graphql",
//   bodyParser.json(),
//   graphqlExpress({
//     schema: Schema,
//   }),
// )

// DServer.use(
//   "/graphiql",
//   graphiqlExpress({
//     endpointURL: "/graphql",
//   }),
// )

