// Require dotenv to get env variables
require("dotenv").config()

import { graphiqlExpress, graphqlExpress } from "apollo-server-express"
import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import httpServer from "http"
import morgan from "morgan"
import path from "path";
import socketIO from "socket.io"
import schema from "./controller/Schema.gql"

// App init
const app = express()
const server = new httpServer.Server(app)
const io = socketIO(server)


// Configure cors
app.use(cors())

// Parse received json from client
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Some guy at the conference (probably JS conf) told that disabling this two tags can increase performance 🚀⚡
app.disable("etag")
app.disable("x-powered-by")
app.use(morgan("combined")) // Logger

app.use(express.static(path.resolve("www")))
app.set("views", path.resolve("views"))
// app.set('view engine', 'html');
console.log(path.resolve(__dirname))
console.log(path.resolve(__dirname, "../views"))
// Render main page
app.get("/", async (req, res) => {
  // res.sendFile(path.resolve())
  res.send('xd')
})

io.on('connection', (socket) => {
  // console.log('connected')
  // for(let i =0 ; i<5;i++) {
  //   console.log(i);
  // }
  socket.emit('xd', {data:'asda'})
})


// Create GraphQL server
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }))
// Create GraphiQL IDE
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))
// Listen on PORT
server.listen(process.env.PORT)
