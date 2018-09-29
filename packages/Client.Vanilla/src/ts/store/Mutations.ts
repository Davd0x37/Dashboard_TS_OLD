import { IState } from "./State";

export default {
  setEmail(state: IState, payload: any) {
    state.service.Spotify.username = payload;
    return state;
  }
}