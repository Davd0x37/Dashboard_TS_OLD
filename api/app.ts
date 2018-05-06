// Require dotenv to get env variables
require('dotenv').config();

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';

// Database initializer
// import Database from './db';
// Database.init()

// GraphQL schemas and resolvers
import resolvers from './graphql/resolver/query';
import typeDefs from './graphql/schema/Schema.gql';

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

// App init
const app = express();
// Create GraphQL server
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// Create GraphiQL IDE
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// Listen on PORT
app.listen(process.env.PORT);
