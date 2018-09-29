import { Component, Method } from "../decorators";
import Triton from "../lib/Triton";

@Component()
export default class SpotifyPlate extends Triton {
  // @Prop()
  // private username: string = Store.state.service.Spotify.username;
  // @Prop()
  // private email: string = Store.state.service.Spotify.email;
  // @Prop()
  // private type: string = Store.state.service.Spotify.type;

  constructor() {
    super();
    setTimeout(() => this.store.dispatch('setEmail', "MARK@MARK.MARK"), 2000)
  }

  @Method()
  public render(): string {
    return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-spotify fa-2x" style="color: #B5EB00;"></i>
      <h3 class="plate__title">Spotify</h3>
    </header>
    <div class="plate__container spotify-plate">
      <aside class="details">
        <p class="label__title">Nazwa użytkownika</p>
        <p class="label__value">${this.store.state.service.Spotify.username}</p>
        <p class="label__title">Email</p>
        <p class="label__value label__value--no-capitalize">${this.store.state.service.Spotify.email}</p>
        <p class="label__title">Typ konta</p>
        <p class="label__value label__last spotify__title--color">
          ${this.store.state.service.Spotify.type}
        </p>
      </aside>
    </div>
  </article>`;
  }
}
