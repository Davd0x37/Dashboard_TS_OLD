import * as dotenv from "dotenv"
dotenv.config()

import * as express from "express"
import * as bodyParser from "body-parser"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"

// Schema
// import { Schema } from "./graphql/schema"

const app = express()

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
