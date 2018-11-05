import Triton from "#/lib/Triton";

export class Spotify extends Triton {
  constructor() {
    super();
  }

  public render(): string {
    return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-spotify fa-2x" style="color: #B5EB00;"></i>
      <h3 class="plate__title">Spotify</h3>
    </header>
    <div class="plate__container spotify-plate">
      <aside class="details">
        <p class="label__title">${this.lang.Spotify.username}</p>
        <p class="label__value">${this.store.getter.Spotify!.Username}</p>
        <p class="label__title">${this.lang.Spotify.email}</p>
        <p class="label__value label__no-capitalize">${this.store.getter.Spotify!.Email}</p>
        <p class="label__title">${this.lang.Spotify.type}</p>
        <p class="label__value label__last spotify__title--color">
          ${this.store.getter.Spotify!.Type}
        </p>
      </aside>
    </div>
  </article>`;
  }

  public mounted(): void {
    //
  }
}

export default new Spotify();
