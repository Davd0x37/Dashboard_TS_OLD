// Require dotenv to get env variables
require('dotenv').config()

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import express from 'express'

import Schema from './graphql/schema/Root.gql'

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({schema: Schema}))

app.listen(process.env.PORT)
