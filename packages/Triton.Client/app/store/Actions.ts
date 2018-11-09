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
  updateID({ commit }: any, payload: IState["id"]) {
    commit("updateID", payload);
  },
  updateAllData({ commit }: any, payload: IState) {
    const data = {
      id: payload.id,
      User: {
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
    commit("updateUser", data.User);
    commit("updateID", data.id);

    document.cookie = `user_id=${data.id}; expires=${new Date("2019")};`;
  }
};
