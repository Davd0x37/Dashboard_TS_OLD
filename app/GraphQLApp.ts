import { GraphQLServer } from 'graphql-yoga'
import { resolvers, typeDefs } from './api/graphql'

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
