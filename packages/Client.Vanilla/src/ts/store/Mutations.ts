import { IState } from "./State";

export default {
  setEmail(state: IState, payload: any) {
    state.Spotify.username = payload;
    return state;
  }
}