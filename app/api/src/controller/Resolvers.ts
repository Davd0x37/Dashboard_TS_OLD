import {createDB} from "./DB"
import { PostMutation, PostQuery } from "./Post";
import { UserMutation, UserQuery } from "./User";
export const resolvers = {
  Query: {
    ...UserQuery,
    ...PostQuery
  },
  Mutation: {
    ...UserMutation,
    ...PostMutation,
    async createDB(): Promise<boolean> {
      await createDB()
      return true
    }
  }
};
