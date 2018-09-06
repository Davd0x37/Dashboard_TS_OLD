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
    username: state => state.header.username,
    spotify: state => state.services.spotify,
    digitalocean: state => state.services.digitalocean,
    paypal: state => state.services.paypal
  },
  mutations: {
    update_header(state, data) {
      state.header = { ...state.header, ...data };
    },
    update_services(state, data) {
      state.services = { ...state.services, ...data };
    },
    update_user_data(state, data) {
      state.header = data.header;
      state.services = data.services;
    }
  },
  actions: {
    update_header({ commit }, data) {
      commit("update_header", data);
    },
    update_user_data({ commit }, data) {
      commit("update_user_data", data);
    },
    update_services({ commit }, data) {
      commit("update_services", data);
    }
  }
});
