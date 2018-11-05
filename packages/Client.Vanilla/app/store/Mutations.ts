import { IState } from './State';

export default {
  updateSpotify(state: IState, payload: IState["Spotify"]) {
    state.Spotify = { ...state.Spotify, ...payload };
    return state;
  },
  updateDigitalOcean(state: IState, payload: IState["DigitalOcean"]) {
    state.DigitalOcean = { ...state.DigitalOcean, ...payload };
    return state;
  },
  updatePaypal(state: IState, payload: IState["Paypal"]) {
    state.Paypal = { ...state.Paypal, ...payload };
    return state;
  },
  updateUser(state: IState, payload: IState["User"]) {
    state.User = { ...state.User, ...payload };
    return state;
  },
  updateID(state: IState, payload: IState["id"]) {
    state.id = payload;
    return state;
  }
};
