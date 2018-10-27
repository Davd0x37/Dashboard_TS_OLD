import { PaypalAuthenticate, SpotifyAuthenticate } from "../../config";
import { Exists, IServices } from "../controller/User/Interface";
import { UpdateDigitalOceanToken, UpdateUser } from "../controller/User/Manager";
import { Component, Method } from "../decorators";
import { error, success } from "../lib/Alert";
import { $ } from "../lib/DOM";
import Triton from "../lib/Triton";

@Component()
class Actions extends Triton {
  constructor() {
    super();
  }

  @Method()
  public render(): string {
    return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-galactic-senate fa-2x" style="color: #ff922b;"></i>
      <h3 class="plate__title">${this.lang.data.Actions.plateName}</h3>
    </header>
    <div class="plate__container actions-plate">
      <aside class="details">
        <button class="btn color" data-router-go="/">${this.lang.data.Actions.homeLink}</button>
        <button class="btn color" data-router-go="/auth">${this.lang.data.Actions.authLink}</button>
        <button class="btn color" id="refresh">${this.lang.data.Actions.refreshData}</button>
      </aside>
      <aside class="details">
        <button class="btn color" id="spotify__authorize">${this.lang.data.Actions.authSpotify}</button>
        <button class="btn color" id="paypal__authorize">${this.lang.data.Actions.authPaypal}</button>
      </aside>
      <aside class="details">
        <div>  
          <p class="label__title">${this.lang.data.Actions.digitalOceanToken}</p>
          <input type="text" id="digitalocean_api_token" class="input" placeholder="${
            this.lang.data.Actions.digitalOceanToken
          }">
        </div>
        <button class="btn color" id="digitalocean_add_token">${this.lang.data.Actions.addToken}</button>
      </aside>
    </div>
  </article>`;
  }

  @Method()
  public mounted(): void {
    $(".actions-plate #spotify__authorize")!.addEventListener("click", () => {
      window.open(`${SpotifyAuthenticate}?id=${this.store.getter.id}`);
    });
    $(".actions-plate #paypal__authorize")!.addEventListener("click", () => {
      window.open(`${PaypalAuthenticate}?id=${this.store.getter.id}`);
    });

    $(".actions-plate #refresh")!.addEventListener("click", async () => {
      try {
        if (this.store.getter.id.length !== 0) {
          const res: IServices | Exists = await UpdateUser({ id: this.store.getter.id });
          if (res !== Exists.NotFound) {
            await this.store.dispatch("updateAllData", { id: this.store.getter.id, ...res });
          }
        }
      } catch (e) {
        error(e);
      }
    });

    $(".actions-plate #digitalocean_add_token")!.addEventListener("click", async () => {
      if (this.store.getter.id.length !== 0) {
        const token = ($(".actions-plate #digitalocean_api_token") as HTMLInputElement)!.value;
        const res = await UpdateDigitalOceanToken({ id: this.store.getter.id, token });
        if (res) {
          success(this.lang.data.Messages.addTokenSuccess, () => null);
        } else {
          error(this.lang.data.Messages.addTokenError);
        }
      }
    });
  }
}

export default new Actions();
