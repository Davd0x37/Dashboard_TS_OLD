import dotenv from "dotenv"
dotenv.config()

import { graphiqlExpress, graphqlExpress } from "apollo-server-express"
import bodyParser from "body-parser"
import express from "express"

// Import
import Rethink from "./db/"

// Schema
// import Schema from "./graphql/schema"

const app = express()

// Establish connection with database

Rethink()

// app.use(
//   "/graphql",
//   bodyParser.json(),
//   graphqlExpress({
//     schema: Schema,
//   }),
// )

// app.use(
//   "/graphiql",
//   graphiqlExpress({
//     endpointURL: "/graphql",
//   }),
// )

app.listen(process.env.PORT || 3000)
