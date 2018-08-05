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
      throw new Error();
    }
  }
};

export const UserActions = [
  {
    action: "Change name",
    icon: "signature",
    view: "changeName"
  },
  {
    action: "Change password",
    icon: "lock",
    view: "changePassword"
  },
  {
    action: "Change avatar",
    icon: "user",
    view: "changeAvatar"
  },
  {
    action: "Change email",
    icon: "envelope",
    view: "changeEmail"
  },
  {
    action: "Change settings",
    icon: "cogs",
    view: "changeSettings"
  }
];
