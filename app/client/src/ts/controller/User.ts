import gql from "graphql-tag";
import Api from "./Api";
import Storage from "./Storage";

export const QueryUser = {
  async authenticate(login: string, password: string): Promise<object> {
    const res = await Api.query(gql`
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
      document.cookie = `user_id=${data.id}; expires=${new Date("2019")}`;
      Storage.store = {
        userId: data.id,
        services: { ...data.services },
        header: { avatar: data.avatar, username: data.login }
      };
      return data;
    } else {
      return {};
    }
  }
};

export const UserActions = [
  {
    action: "Change name",
    icon: "signature",
    view: `
    <div>Username</div>
    `
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
