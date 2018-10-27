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
  updateUser({ commit }: any, payload: IState["User"]) {
    commit("updateUser", payload);
  },
  updateID({ commit }: any, payload: IState["User"]) {
    commit("updateID", payload);
  },
  updateAllData({ commit }: any, payload: IState) {
    const data = {
      id: payload.id,
      user: {
        ...payload.User
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
    commit("updateID", data.id);
  },
  restoreStorage({ commit }: any, payload: IState) {
    commit("restoreStorage", payload);
  },
  saveInStorage({ commit }: any, payload: IState) {
    commit("saveInStorage", payload);
  }
};
