import gql from "graphql-tag";
import App from "../App";

export const User = {
  async authenticate(login: string, password: string): Promise<boolean> {
    const res: any = await App.client.query({
      query: gql`
        query {
          getUser(login: "${login}", password: "${password}") {
            avatar
            login
            password
            email
          }
        }
      `
    });
    if (res.data.getUser !== null) {
      console.log(res.data.getUser);
      return true;
    } else {
      alert("Błędne dane");
      return false;
    }
  }
};