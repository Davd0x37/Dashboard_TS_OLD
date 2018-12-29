import UserMutation from "@/components/user/Mutation";
// import UserQuery from "../components/user/Query";
export const resolvers = {
  // Query: {
  //   ...UserQuery
  // },
  Mutation: {
    ...UserMutation
  }
};
