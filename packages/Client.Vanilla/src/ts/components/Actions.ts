import { PaypalAuthenticate, SpotifyAuthenticate } from "../../config";
import { IServices } from "../controller/User/Interface";
import { UpdateDigitalOceanToken, UpdateUser } from "../controller/User/Manager";
import { fromEvent } from "../lib/Observable";
import Triton from "../lib/Triton";
import { error, success } from "../utils/Alert";
import { $ } from "../utils/DOM";

class Actions extends Triton {
  constructor() {
    super();
  }

  public render(): string {
    return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-galactic-senate fa-2x" style="color: #ff922b;"></i>
      <h3 class="plate__title">${this.lang.Actions.plateName}</h3>
    </header>
    <div class="plate__container actions-plate">
      <aside class="details">
        <button class="btn color" data-router-go="/">${this.lang.Actions.homeLink}</button>
        <button class="btn color" data-router-go="/auth">${this.lang.Actions.authLink}</button>
        <button class="btn color" id="refresh">${this.lang.Actions.refreshData}</button>
      </aside>
      <aside class="details">
        <button class="btn color" id="spotify__authorize">${this.lang.Actions.authSpotify}</button>
        <button class="btn color" id="paypal__authorize">${this.lang.Actions.authPaypal}</button>
      </aside>
      <aside class="details">
        <div>  
          <p class="label__title">${this.lang.Actions.digitalOceanToken}</p>
          <input type="text" id="digitalocean_api_token" class="input" placeholder="${
            this.lang.Actions.digitalOceanToken
          }">
        </div>
        <button class="btn color" id="digitalocean_add_token">${this.lang.Actions.addToken}</button>
      </aside>
    </div>
  </article>`;
  }

  public mounted(): void {
    fromEvent($(".actions-plate #spotify__authorize")!, "click").subscribe({
      next: () => window.open(`${SpotifyAuthenticate}?id=${this.store.getter.id}`)
    });
    fromEvent($(".actions-plate #paypal__authorize")!, "click").subscribe({
      next: () => window.open(`${PaypalAuthenticate}?id=${this.store.getter.id}`)
    });

    fromEvent($(".actions-plate #refresh")!, "click").subscribe({
      next: async () => {
        try {
          if (this.store.getter.id.length !== 0) {
            const res: IServices | false = await UpdateUser({ id: this.store.getter.id });
            if (res) {
              await this.store.dispatch("updateAllData", { id: this.store.getter.id, ...res });
            }
          }
        } catch (e) {
          error(e);
        }
      }
    });

    fromEvent($(".actions-plate #digitalocean_add_token")!, "click").subscribe({
      next: async () => {
        if (this.store.getter.id.length !== 0) {
          const token = ($(".actions-plate #digitalocean_api_token") as HTMLInputElement)!.value;
          const res = await UpdateDigitalOceanToken({ id: this.store.getter.id, token });
          if (res) {
            success(this.lang.Messages.addTokenSuccess, () => null);
          } else {
            error(this.lang.Messages.addTokenError);
          }
        }
      }
    });
  }
}

export default new Actions();
