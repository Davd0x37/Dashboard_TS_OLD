import gql from "graphql-tag";
import { mutation, query } from "./Api";

const fragments = `
fragment Services on User {
  Spotify {
    email
    username
    type
  }
  DigitalOcean {
    email
    total
    dropletLimit
    lastCreatedDroplet
  }
  Paypal {
    username
    email
    phone
    verified
    country
    zoneinfo
  }
}
`;

export const QueryUser = {
  async authenticate(login: string, password: string): Promise<object | boolean> {
    const res: any = await query(gql`
    ${fragments}
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
    const data = res.authenticateUser;
    if (data !== null) {
      return data;
    } else {
      return false;
    }
  },
  async registerUser(login: string, password: string, email: string): Promise<boolean> {
    const res: any = await mutation(gql`
      mutation {
        addUser(data: {
          avatar: ""
          email: "${email}"
          login: "${login}"
          password: "${password}"
        })
      }
    `);
    return res.addUser;
  },

  async updateUserData(id: string): Promise<object | boolean> {
    const res: any = await mutation(gql`
    ${fragments}
        mutation {
          updateUserData(id: "${id}") {
            ...Services
          }
        }
      `);
    const data = res.updateUserData;
    if (data !== null) {
      return data;
    } else {
      return false;
    }
  },

  async updateDigitalOceanToken(id: string, token: string): Promise<boolean> {
    const res = await mutation(gql`
    mutation {
      updateDigitalOceanToken(id: "${id}", token: "${token}")
    }
    `);
    return !!res;
  }
};
