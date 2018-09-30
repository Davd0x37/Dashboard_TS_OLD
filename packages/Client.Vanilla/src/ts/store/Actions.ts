import Storage from "../controller/Storage";
import { IState } from "./State";

export default {
  updateSpotify({ commit }: any, payload: IState["Spotify"]) {
    commit("updateSpotify", payload);
  },
  updateDigitalOcean({ commit }: any, payload: IState["DigitalOcean"]) {
    commit("updateDigitalOcean", payload);
  },
  updatePaypal({ commit }: any, payload: IState["Paypal"]) {
    commit("updatePaypal", payload);
  },
  updateUser({ commit }: any, payload: IState["user"]) {
    commit("updateUser", payload);
  },
  updateAllData({ commit }: any, payload: IState) {
    commit("updateSpotify", payload.Spotify);
    commit("updateDigitalOcean", payload.DigitalOcean);
    commit("updatePaypal", payload.Paypal);
    commit("updateUser", payload.user);
    Storage.storageData = payload;
  },
  saveInStorage({ commit }: any, payload: IState) {
    commit("saveInStorage", payload);
  }
};
