// @TODO: Fix this. Dunno why this not work with import.
const { makeExecutableSchema } = require("graphql-tools")
import Resolvers from "./resolvers/index"
import Schema from "./Schema.gql"

export default makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
})
