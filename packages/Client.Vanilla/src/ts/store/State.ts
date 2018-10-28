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
      Login: "",
      Email: ""
    },
    Spotify: {
      Username: "",
      Email: "",
      Type: ""
    },
    DigitalOcean: {
      Email: "",
      LastCreatedDroplet: 0,
      DropletLimit: 0,
      Total: 0
    },
    Paypal: {
      Username: "",
      Email: "",
      Phone: "",
      Country: "",
      Verified: "",
      Zoneinfo: ""
    }
  }
};
