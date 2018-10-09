import gql from "graphql-tag";
import { mutation, query } from "../Api";
import { Services } from "./Fragments";
import { IAuthenticateUser, IServices } from "./Interface";

export const AuthenticateUser = async ({
  login,
  password
}: {
  login: string;
  password: string;
}): Promise<IAuthenticateUser | boolean> => {
  const { authenticateUser }: { authenticateUser: IAuthenticateUser } = await query(gql`
  ${Services}
  query {
    authenticateUser(login: "${login}", password: "${password}") {
      id
      avatar
      login
      email
      ...Services
    }
  }
  `);
  return authenticateUser !== null ? authenticateUser : false;
};

export const RegisterUser = async ({
  login,
  password,
  email
}: {
  login: string;
  password: string;
  email: string;
}): Promise<boolean> => {
  const { addUser }: { addUser: boolean } = await mutation(gql`
  mutation {
    addUser(data: {
      avatar: ""
      email: "${email}"
      login: "${login}"
      password: "${password}"
    })
  }
  `);
  return addUser;
};

export const UpdateUser = async ({ id }: { id: string }): Promise<IServices | boolean> => {
  const { updateUserData }: { updateUserData: IServices } = await mutation(gql`
  ${Services}
  mutation {
    updateUserData(id: "${id}") {
      ...Services
    }
  }
  `);
  return updateUserData !== null ? updateUserData : false;
};

export const UpdateDigitalOceanToken = async ({ id, token }: { id: string; token: string }): Promise<boolean> => {
  const { updateDigitalOceanToken }: { updateDigitalOceanToken: boolean } = await mutation(gql`
  mutation {
    updateDigitalOceanToken(id: "${id}", token: "${token}")
  }
  `);
  return !!updateDigitalOceanToken;
};
