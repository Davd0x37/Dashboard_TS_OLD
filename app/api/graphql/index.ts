import { makeExecutableSchema } from 'graphql-tools';

import {resolvers} from './resolvers'
import Schema from './schema.gql'
const typeDefs = `
${Schema}
`

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export { schema };
