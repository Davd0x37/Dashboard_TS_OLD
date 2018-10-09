import gql from "graphql-tag";
import { mutation, query } from "../Api";
import { Services } from "./Fragments";
import { IServices, IUser } from "./Interface";

interface IULogin {
  login: string;
  password: string;
}
interface IURegister extends IULogin {
  email: string;
}

export const AuthenticateUser = async ({ login, password }: IULogin): Promise<IUser | boolean> => {
  const { authenticateUser }: { authenticateUser: IUser } = await query(gql`
  ${Services}
  query {
    authenticateUser(login: "${login}", password: "${password}") {
      id
      user {
        avatar
        login
        email
      }
      ...Services
    }
  }
  `);
  return authenticateUser !== null ? authenticateUser : false;
};

export const RegisterUser = async ({ login, password, email }: IURegister): Promise<boolean> => {
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
