import { IUser } from "../controller/User/Interface";

export interface IStateStore {
  store: IUser;
}
export type IState = IStateStore["store"];

export const State: IStateStore = {
  store: {
    id: "",
    User: {
      Avatar:
        "https://images.8tracks.com/cover/i/009/400/711/mr_robot_fuck_society-866.jpg?rect=0,170,1047,1047&q=98&fm=jpg&fit=max&w=640&h=640",
      Login: "Vernon",
      Email: "vernon@pm.me"
    },
    Spotify: {
      Username: "Vernon",
      Email: "vernon@pm.me",
      Type: "Premium"
    },
    DigitalOcean: {
      Email: "vernon@pm.me",
      LastCreatedDroplet: 20,
      DropletLimit: 10,
      Total: 2
    },
    Paypal: {
      Username: "Vernon",
      Email: "vernon@pm.me",
      Phone: "123456789",
      Country: "Poland",
      Verified: "Verified",
      Zoneinfo: "Szczecin"
    }
  }
};
