import { IDigitalOcean, IPaypal, ISpotify, IUser } from "../controller/User/Interface";

export interface IStateStore {
  store: {
    user: IUser;
    Spotify: ISpotify;
    DigitalOcean: IDigitalOcean;
    Paypal: IPaypal;
  };
}
export type IState = IStateStore["store"];

export const State: IStateStore = {
  store: {
    user: {
      id: "",
      avatar:
        "https://images.8tracks.com/cover/i/009/400/711/mr_robot_fuck_society-866.jpg?rect=0,170,1047,1047&q=98&fm=jpg&fit=max&w=640&h=640",
      login: "Vernon",
      email: "vernon@pm.me"
    },
    Spotify: {
      username: "Vernon",
      email: "vernon@pm.me",
      type: "Premium"
    },
    DigitalOcean: {
      email: "vernon@pm.me",
      lastCreatedDroplet: 20,
      dropletLimit: 10,
      total: 2
    },
    Paypal: {
      username: "Vernon",
      email: "vernon@pm.me",
      phone: "123456789",
      country: "Poland",
      verified: "Verified",
      zoneinfo: "Szczecin"
    }
  }
};
