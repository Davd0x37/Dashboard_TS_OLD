import { mutation, query } from "#/lib/Api";
import { IUserDocType } from "#SH/Interfaces";
import gql from "graphql-tag";

export const authenticateUser = async ({
  login,
  password
}: IULogin): Promise<IUserDocType> => {
  const { AuthenticateUser } = await query(gql`
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
  return AuthenticateUser;
};

export const registerUser = async ({
  login,
  password,
  email,
  avatar
}: IURegister): Promise<boolean> => {
  const { AddUser } = await mutation(gql`
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

export const updateUser = async ({
  id
}: {
  readonly id: string;
}): Promise<IUserDocType> => {
  const { UpdateUserData } = await mutation(gql`
  mutation {
    UpdateUserData(id: "${id}") {
      ${Services}
    }
  }
  `);
  return UpdateUserData;
};

export const updateDigitalOceanToken = async ({
  id,
  token
}: {
  readonly id: string;
  readonly token: string;
}): Promise<boolean> => {
  const { UpdateDigitalOceanToken } = await mutation(gql`
  mutation {
    UpdateDigitalOceanToken(id: "${id}", token: "${token}")
  }
  `);
  return UpdateDigitalOceanToken;
};

interface IULogin {
  readonly login: string;
  readonly password: string;
}

interface IURegister extends IULogin {
  readonly email: string;
  readonly avatar: string;
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
