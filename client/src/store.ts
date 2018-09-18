import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: "Vernon Roche",
      avatar: "",
      logged: false
    },
    services: {
      spotify: {
        username: "Jon Doe",
        email: "jondoe@gmail.com",
        type: "Free"
      },
      digitalocean: {
        lastCreatedDroplet: "0",
        email: "jondoe@pm.me",
        dropletLimit: "77",
        total: "7"
      },
      paypal: {
        username: "Jon Doe",
        email: "jondoe@pm.me",
        phone: "123 456 789",
        verified: "Verified",
        country: "Finland",
        zoneinfo: "Helsinki"
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
