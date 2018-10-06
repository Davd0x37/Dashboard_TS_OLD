import { Component, Method } from "../decorators";
import Triton from "../lib/Triton";

@Component()
class Spotify extends Triton {
  public static i: number = 0;
  constructor() {
    super();
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
        <p class="label__value">${this.store.getter.Spotify.username}</p>
        <p class="label__title">Email</p>
        <p class="label__value label__value--no-capitalize">${this.store.getter.Spotify.email}</p>
        <p class="label__title">Typ konta</p>
        <p class="label__value label__last spotify__title--color">
          ${this.store.getter.Spotify.type}
        </p>
      </aside>
    </div>
  </article>`;
  }

  @Method()
  public mounted(): void {
    //
  }
}

export default new Spotify();
