import gql from "graphql-tag";
import { query } from "./Api";

export const QueryUser = {
  async authenticate(login: string, password: string): Promise<object> {
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
                dropletLimit
                total
                lastCreatedDroplet
              }
              paypal {
                username
                email
                phone
                language
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
      const date = new Date();
      let month = date.getMonth();
      let year = date.getFullYear();
      if (month + 1 > 12) {
        year++;
        month++;
      }
      const newDate = new Date(`${year}-${month}-${date.getDate()}`);
      document.cookie = `user_id=${data.id}; expires=${newDate}`;
      return data;
    } else {
      return {};
    }
  }
};