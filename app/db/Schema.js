import { makeExecutableSchema } from "graphql-tools"

import { books, addBook } from "../controller/User/GetBooks.js"

import { Book, Query } from "./Types"

const typeDefs = `
schema {
  query: Query
  mutation: Mutation
}
${Book}
${Query}
type Mutation {
  addBooks(title: String!, author: String!): Book
}
`
const resolvers = {
  Query: {
    books() {
      return books
    },
    book(root, args) {
      return {
        id: 0,
        title: args,
      }
    },
  },
  Mutation: {
    addBooks(root, args) {
      addBook(args.title, args.author)
      return {
        title: args.title,
        author: args.author,
      }
    },
  },
}

export const Schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
