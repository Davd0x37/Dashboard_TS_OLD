import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      avatar: "",
      logged: false
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
        verified: "",
        country: "",
        zoneinfo: ""
      }
    }
  },
  getters: {
    user: state => state.user,
    spotify: state => state.services.spotify,
    digitalocean: state => state.services.digitalocean,
    paypal: state => state.services.paypal
  },
  mutations: {
    update_user(state, data) {
      state.user = { ...state.user, ...data };
    },
    update_services(state, data) {
      state.services = { ...state.services, ...data };
    },
    update_user_data(state, data) {
      state.user = data.user;
      state.services = data.services;
    }
  },
  actions: {
    update_user({ commit }, data) {
      commit("update_user", data);
    },
    update_user_data({ commit }, data) {
      commit("update_user_data", data);
    },
    update_services({ commit }, data) {
      commit("update_services", data);
    }
  }
});
