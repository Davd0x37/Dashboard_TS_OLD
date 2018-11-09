import { mutation, query } from "#/lib/Api";
import { IUserDocType } from "#SH/Interfaces";
import gql from "graphql-tag";

export const AuthenticateUser = async ({
  login,
  password
}: IULogin): Promise<IUserDocType | false> => {
  const {
    AuthenticateUser
  }: { AuthenticateUser: IUserDocType } = await query(gql`
  query {
    AuthenticateUser(login: "${login}", password: "${password}") {
      id
      User {
        Avatar
        Login
        Email
      }
      ${Services}
    }
  }
  `);
  return AuthenticateUser !== null ? AuthenticateUser : false;
};

export const RegisterUser = async ({
  login,
  password,
  email,
  avatar
}: IURegister): Promise<boolean> => {
  const { AddUser }: { AddUser: boolean } = await mutation(gql`
  mutation {
    AddUser(data: {
      Avatar: "${avatar}"
      Email: "${email}"
      Login: "${login}"
      Password: "${password}"
    })
  }
  `);
  return AddUser;
};

export const UpdateUser = async ({
  id
}: {
  id: string;
}): Promise<IUserDocType | false> => {
  const {
    UpdateUserData
  }: { UpdateUserData: IUserDocType } = await mutation(gql`
  mutation {
    UpdateUserData(id: "${id}") {
      ${Services}
    }
  }
  `);
  return UpdateUserData !== null ? UpdateUserData : false;
};

export const UpdateDigitalOceanToken = async ({
  id,
  token
}: {
  id: string;
  token: string;
}): Promise<boolean> => {
  const {
    UpdateDigitalOceanToken
  }: { UpdateDigitalOceanToken: boolean } = await mutation(gql`
  mutation {
    UpdateDigitalOceanToken(id: "${id}", token: "${token}")
  }
  `);
  return UpdateDigitalOceanToken;
};

interface IULogin {
  login: string;
  password: string;
}

interface IURegister extends IULogin {
  email: string;
  avatar: string;
}

export const Services = `
Spotify {
  Email
  Username
  Type
}
DigitalOcean {
  Email
  Total
  DropletLimit
  LastCreatedDroplet
}
Paypal {
  Username
  Email
  Phone
  Verified
  Country
  Zoneinfo
}
`;
