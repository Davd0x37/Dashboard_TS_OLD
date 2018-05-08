// Require dotenv to get env variables
require('dotenv').config()

import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

// App init
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use(express.static(path.resolve("www")))
app.set('views', path.resolve('www'))

app.get('/', async (req, res) => {
	res.render('index')
})

// Create GraphQL server
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// Create GraphiQL IDE
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
// Listen on PORT
app.listen(process.env.PORT)
