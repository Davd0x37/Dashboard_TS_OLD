import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {
      id: "",
      User: {
        Avatar:
          "https://yt3.ggpht.com/a-/AN66SAwdQriG6vbRpwlzgnvmIW5pDostKUfLaAnmJA=s48-mo-c-c0xffffffff-rj-k-no",
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
        LastCreatedDroplet: "",
        DropletLimit: "",
        Total: ""
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
  },
  mutations: {
    UpdateUserData(state: IUserDocType, payload: IUserDocType) {
      const newState = { ...state.data, ...payload };
      Vue.set(state, "data", newState);
    }
  },
  actions: {
    UpdateUserData({ commit }: any, payload: IUserDocType) {
      commit("UpdateUserData", payload);
    }
  }
});

export interface IUserDocType {
  data: {
    id: string;
    User: {
      Avatar: string;
      Email: string;
      Login: string;
    };
    Spotify?: {
      Email?: string;
      Username?: string;
      Type?: string;
    };
    DigitalOcean?: {
      Email?: string;
      Total?: string;
      DropletLimit?: string;
      LastCreatedDroplet?: string;
    };
    Paypal?: {
      Username?: string;
      Email?: string;
      Phone?: string;
      Verified?: string;
      Country?: string;
      Zoneinfo?: string;
    };
  };
}
