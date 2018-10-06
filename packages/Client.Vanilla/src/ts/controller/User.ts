import gql from "graphql-tag";
import { mutation, query } from "./Api";

export enum UserCodes {
  AUTHENTICATED = 1,
  REGISTERER,
  NOTFOUND
}

export const QueryUser = {
  async authenticate(login: string, password: string): Promise<object | UserCodes> {
    const res: any = await query(gql`
        query {
          authenticateUser(login: "${login}", password: "${password}") {
            id
            avatar
            login
            email
            services {
              spotify {
                email
                username
                type
              }
              digitalocean {
                email
                total
                dropletLimit
                lastCreatedDroplet
              }
              paypal {
                username
                email
                phone
                verified
                country
                zoneinfo
              }
            }
          }
        }
      `);
    const data = res.authenticateUser;
    if (data !== null) {
      return data;
    } else {
      return UserCodes.NOTFOUND;
    }
  },
  async registerUser(login: string, password: string, email: string): Promise<boolean> {
    const res: any = await mutation(gql`
      mutation {
        addUser(data: {
          avatar: ""
          email: "${login}"
          login: "${password}"
          password: "${email}"
        })
      }
    `)
    return res;
  }
};
