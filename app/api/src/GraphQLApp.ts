import { GraphQLServer } from 'graphql-yoga'
import { resolvers } from './controller/Resolvers'
import typeDefs from './controller/Schema.gql'

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
