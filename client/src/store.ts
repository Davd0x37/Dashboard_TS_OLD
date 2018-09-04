import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    header: {
      username: "Vernon Roche",
      avatar: ""
    },
    services: {
      spotify: {
        username: "",
        email: "",
        type: ""
      },
      digitalocean: {
        lastCreatedDroplet: "",
        email: "",
        dropletLimit: "",
        total: ""
      },
      paypal: {
        username: "",
        email: "",
        phone: "",
        language: "",
        verified: "",
        country: "",
        zoneinfo: ""
      }
    }
  },
  mutations: {
    change_user_id(state, id) {
      state.header.username = id;
    }
  },
  getters: {
    username: state => state.header.username
  },
  actions: {
    change_user({ commit }, id) {
      setTimeout(() => {
        commit("change_user_id", id);
      }, 2000);
    }
  }
});
