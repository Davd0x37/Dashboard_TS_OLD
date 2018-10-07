import gql from "graphql-tag";
import { error, success } from "../controller/Alert";
import { mutation } from "../controller/Api";
import Router from "../controller/Router";
import { QueryUser } from "../controller/User";
import { Component, Method, Prop } from "../decorators";
import Triton from "../lib/Triton";
import { $ } from "../utils/DOM";

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
        <button class="btn color" id="home">Home</button>
        <button class="btn color" id="auth">Authenticate</button>
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
        const res: any = await QueryUser.updateUserData(this.store.getter.user.id);
        await this.store.dispatch("updateAllData", { ...res });
      } catch (e) {
        error(e);
      }
    });

    $(".actions-plate #auth")!.addEventListener("click", (e: any) => {
      Router.go("/auth");
    });
    $(".actions-plate #home")!.addEventListener("click", (e: any) => {
      Router.go("/");
    });

    $(".actions-plate #digitalocean_add_token")!.addEventListener("click", async (e: any) => {
      const token = ($(".actions-plate #digitalocean_api_token") as HTMLInputElement)!.value;
      const res = await mutation(gql`
      mutation {
        updateDigitalOceanToken(id: "${this.store.getter.user.id}", token: "${token}")
      }
      `);
      if (res) {
        success("Poprawnie dodano token", () => null);
      } else {
        error("Nie można dodać tokena");
      }
    });
  }
}

export default new Actions();
