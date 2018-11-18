import { updateUserData } from "#/controller/Actions";
import { updateDigitalOceanToken } from "#/controller/UserManager";
import lang from "#/i18n";
import Component from "#/lib/Component";
import store from "#/store";
import { error, success } from "#/utils/Alert";
import { VElement } from "#/vdom/Interfaces";
import { createElement } from "#/vdom/VDOM";
import { PaypalAuthenticate, SpotifyAuthenticate } from "#SH/Config";

export default class Actions extends Component {
  public apiToken: string = "";

  constructor(props?: {}) {
    super(props);
  }

  public render(): VElement {
    return (
      <article class="plate">
        <header class="plate__brand">
          <i class="fab fa-galactic-senate fa-2x" style="color: #ff922b;" />
          <h3 class="plate__title">{lang.Actions.plateName}</h3>
        </header>
        <div class="plate__container actions-plate">
          <aside class="details">
            <button class="btn color">{lang.Actions.homeLink}</button>
            <button class="btn color">{lang.Actions.authLink}</button>
            <button class="btn color" id="refresh" onClick={this.refreshData}>
              {lang.Actions.refreshData}
            </button>
          </aside>
          <aside class="details">
            <button class="btn color" onClick={this.authSpotify}>
              {lang.Actions.authSpotify}
            </button>
            <button class="btn color" onClick={this.authPaypal}>
              {lang.Actions.authPaypal}
            </button>
          </aside>
          <aside class="details">
            <div>
              <p class="label__title">{lang.Actions.digitalOceanToken}</p>
              <input
                type="text"
                id="digitalocean_api_token"
                class="input"
                placeholder={lang.Actions.digitalOceanToken}
              />
            </div>
            <button class="btn color" onClick={this.digitalOceanToken.bind(this)}>
              {lang.Actions.addToken}
            </button>
          </aside>
        </div>
      </article>
    );
  }

  public mounted() {
    const el = this.pCurrentElement.dom;
    if (el) {
      this.apiToken = (el.querySelector(
        "#digitalocean_api_token"
      )! as HTMLInputElement).value;
    }
  }

  public async refreshData() {
    const res = await updateUserData(store.getter().id);
    return res
      ? success(lang.Messages.updateUserDataSuccess, () => null)
      : error(lang.Messages.updateUserDataError);
  }

  public authSpotify = () => {
    // window.open(`${SpotifyAuthenticate}?id=${store.getter().id}`);
    this.setState({id: "1"})
  }

  public authPaypal() {
    window.open(`${PaypalAuthenticate}?id=${store.getter().id}`);
  }

  public async digitalOceanToken(): Promise<boolean> {
    console.log(this.apiToken)
    const token = this.apiToken;
    const id = store.getter().id;
    const res = await updateDigitalOceanToken({
      id,
      token
    });
    return res
      ? success(lang.Messages.addTokenSuccess, () => null)
      : error(lang.Messages.addTokenError);
  }
}
