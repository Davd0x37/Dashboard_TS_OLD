import { makeExecutableSchema } from "graphql-tools"
import Resolvers from "./resolvers/index"
import Schema from "./Schema.gql"

export default makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
})
