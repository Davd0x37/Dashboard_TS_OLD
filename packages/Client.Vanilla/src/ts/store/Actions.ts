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
    const data = {
      user: {
        ...payload.user
      },
      Spotify: {
        ...payload.Spotify
      },
      DigitalOcean: {
        ...payload.DigitalOcean
      },
      Paypal: {
        ...payload.Paypal
      }
    };
    commit("updateSpotify", data.Spotify);
    commit("updateDigitalOcean", data.DigitalOcean);
    commit("updatePaypal", data.Paypal);
    commit("updateUser", data.user);
  },
  restoreStorage({ commit }: any, payload: IState) {
    commit("restoreStorage", payload);
  },
  saveInStorage({ commit }: any, payload: IState) {
    commit("saveInStorage", payload);
  }
};