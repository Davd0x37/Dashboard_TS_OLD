import { createDB } from "./DB";
import { UserMutation, UserQuery } from "./User";
export const resolvers = {
  Query: {
    ...UserQuery
  },
  Mutation: {
    ...UserMutation,
    async createDB(): Promise<boolean> {
      await createDB();
      return true;
    }
  }
};
