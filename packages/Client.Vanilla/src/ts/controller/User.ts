import gql from "graphql-tag";
import { mutation, query } from "./Api";

export const QueryUser = {
  async authenticate(login: string, password: string): Promise<object | boolean> {
    const res: any = await query(gql`
        query {
          authenticateUser(login: "${login}", password: "${password}") {
            id
            avatar
            login
            email
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
        mutation {
          updateUserData(id: "${id}") {
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
        }
      `);
    const data = res.updateUserData;
    if (data !== null) {
      return data;
    } else {
      return false;
    }
  },
};
