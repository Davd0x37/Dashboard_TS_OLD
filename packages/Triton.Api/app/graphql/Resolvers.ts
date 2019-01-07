import { Mutation, Query } from "@/components/user";
export const resolvers = {
  Query: {
    ...Query
  },
  Mutation: {
    ...Mutation
  }
};
