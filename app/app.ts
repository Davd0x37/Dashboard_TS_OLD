// Require dotenv to get env variables
require('dotenv').config()

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import httpServer from 'http'
import morgan from 'morgan'
import path from 'path'
import socketIO from 'socket.io'
import { schema } from './graphql'

// App init
const app = express()
const server = new httpServer.Server(app)
const io = socketIO(server)


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.disable('etag')
app.disable('x-powered-by')
app.use(morgan('combined')) // Logger
app.use(express.static(path.resolve('www')))
app.set('views', path.resolve('views'))

app.get('/', async (req, res) => {
	res.render('index')
	
})

// Create GraphQL server
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
// Create GraphiQL IDE
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
// Listen on PORT
server.listen(process.env.PORT)
