import { IState } from "./State";

export default {
  UpdateUserData(state: IState, payload: IState): IState {
    return { ...state, ...payload };
  }
};
