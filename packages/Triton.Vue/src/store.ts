import Vue from "vue";
import Vuex from "vuex";
import { IUserDocType, IUserManager } from "@/types/Interface";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {
      session_id: "",
      // role: "admin",
      avatar: "",
      email: "",
      registerDate: "",
      isOnline: false,
      services: undefined
    }
  },
  mutations: {
    UserManager(state: IUserDocType, payload: IUserManager) {
      const newState = { ...state.data, ...payload.data };
      Vue.set(state, "data", newState);
    }
  },
  actions: {
    UserManager({ commit }: any, payload: IUserManager) {
      commit("UserManager", payload);
    },
  }
});
