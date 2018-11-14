import { IUserDocType } from "#SH/Interfaces";
// tslint:disable

interface IStateStore {
  store: IUserDocType;
}
export type IState = IStateStore["store"];

export const State: IStateStore = {
  store: {
    id: "",
    User: {
      Avatar: "",
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
      LastCreatedDroplet: "0",
      DropletLimit: "0",
      Total: "0"
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
