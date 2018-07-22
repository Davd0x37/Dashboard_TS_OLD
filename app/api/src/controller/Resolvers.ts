import { PostMutation, PostQuery } from "./Post";
import { UserMutation, UserQuery } from "./User";

export const resolvers = {
  Query: {
    ...UserQuery,
    ...PostQuery
  },
  Mutation: {
    ...UserMutation,
    ...PostMutation
  }
};
