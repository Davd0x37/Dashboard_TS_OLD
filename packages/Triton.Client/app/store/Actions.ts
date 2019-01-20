import { IState } from "./State";

export default {
  UpdateUserData: ({ commit }: any, payload: IState): IState =>
    commit("UpdateUserData", payload)
};
