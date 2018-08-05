import gql from "graphql-tag";
import App from "../App";

export const User = {
  async authenticate(login: string, password: string): Promise<object> {
    const res = await App.query(gql`
        query {
          getUser(login: "${login}", password: "${password}") {
            avatar
            login
            password
            email
          }
        }
      `);
    if (res.getUser !== null) {
      return res.getUser;
    } else {
      throw new Error()
    }
  }
};
