export default {
  setEmail(state: any, payload: any) {
    state.service.Spotify.username = payload;
    return state;
  }
}