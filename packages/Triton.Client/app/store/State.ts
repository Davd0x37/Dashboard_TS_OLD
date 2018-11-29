import { IUserDocType } from "#SH/Interfaces";
// tslint:disable

export interface IStateStore {
  store: IUserDocType;
}
export type IState = IStateStore["store"];

export const State: IStateStore = {
  store: {
    id: "",
    User: {
      Avatar: "https://yt3.ggpht.com/a-/AN66SAwdQriG6vbRpwlzgnvmIW5pDostKUfLaAnmJA=s48-mo-c-c0xffffffff-rj-k-no",
      Login: "Vernon",
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
