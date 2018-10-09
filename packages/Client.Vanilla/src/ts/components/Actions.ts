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
      <h3 class="plate__title">Spotify</h3>
    </header>
    <div class="plate__container actions-plate">
      <aside class="details">
        <button class="btn color" data-router-go="/">Home</button>
        <button class="btn color" data-router-go="/auth">Authenticate</button>
        <button class="btn color" id="refresh">Refresh data</button>
      </aside>
      <aside class="details">
        <button class="btn color" id="spotify__authorize">Authorize Spotify</button>
        <button class="btn color" id="paypal__authorize">Authorize Paypal</button>
      </aside>
      <aside class="details">
        <div>  
          <p class="label__title">DigitalOcean API Token</p>
          <input type="text" id="digitalocean_api_token" class="input">
        </div>
        <button class="btn color" id="digitalocean_add_token">Add api token</button>
      </aside>
    </div>
  </article>`;
  }

  @Method()
  public mounted(): void {
    $(".actions-plate #spotify__authorize")!.addEventListener("click", (e: any) => {
      window.open("http://localhost:4000/spotify/authenticate");
    });
    $(".actions-plate #paypal__authorize")!.addEventListener("click", (e: any) => {
      window.open("http://localhost:4000/paypal/authenticate");
    });

    $(".actions-plate #refresh")!.addEventListener("click", async () => {
      try {
        const res: any = await UpdateUser({ id: this.store.getter.user.id });
        await this.store.dispatch("updateAllData", { ...res });
      } catch (e) {
        error(e);
      }
    });

    $(".actions-plate #digitalocean_add_token")!.addEventListener("click", async (e: any) => {
      const token = ($(".actions-plate #digitalocean_api_token") as HTMLInputElement)!.value;
      const res = await UpdateDigitalOceanToken({ id: this.store.getter.user.id, token });
      if (res) {
        success("Poprawnie dodano token", () => null);
      } else {
        error("Nie można dodać tokena");
      }
    });
  }
}

export default new Actions();