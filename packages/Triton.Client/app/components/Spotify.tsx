import lang from "#/i18n";
import Component from "#/lib/Component";
import { VElement } from "#/vdom/Interfaces";
import { createElement } from "#/vdom/VDOM";

export default class Spotify extends Component {
  protected state = {
    username: this.store.getter().Spotify!.Username,
    email: this.store.getter().Spotify!.Email,
    type: this.store.getter().Spotify!.Type
  };

  constructor(props?: {}) {
    super(props);
  }

  public render(): VElement {
    return (
      <article class="plate">
        <header class="plate__brand">
          <i class="fab fa-spotify fa-2x" style="color: #B5EB00;" />
          <h3 class="plate__title">Spotify</h3>
        </header>
        <div class="plate__container spotify-plate">
          <aside class="details">
            <p class="label__title">{lang.Spotify.username}</p>
            <p class="label__value">{this.state.username}</p>
            <p class="label__title">{lang.Spotify.email}</p>
            <p class="label__value label__no-capitalize">{this.state.email}</p>
            <p class="label__title">{lang.Spotify.type}</p>
            <p class="label__value label__last spotify__title--color">
              {this.state.type}
            </p>
          </aside>
        </div>
      </article>
    );
  }
}
