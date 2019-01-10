import Vue from "vue";
import Vuex from "vuex";
import { IUserDocType } from "@/types/Interface";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session_id: "",
    avatar: "",
    email: "",
    registerDate: "",
    isOnline: false,
    services: [{
      serviceName: "",
      data: "",
    }]

  },
  mutations: {
    UpdateUserData(state: IUserDocType, payload: IUserDocType) {
      const newState = { ...state, ...payload };
      Vue.set(state, "data", newState);
    }
  },
  actions: {
    UpdateUserData({ commit }: any, payload: IUserDocType) {
      commit("UpdateUserData", payload);
    }
  }
});