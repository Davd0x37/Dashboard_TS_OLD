import lang from "#/i18n";
import Component from "#/lib/Component";
import { VElement } from "#/vdom/Interfaces";
import { createElement } from "#/vdom/VDOM";

export default class Paypal extends Component {
  protected state = {
    username: this.store.getter().Paypal!.Username,
    email: this.store.getter().Paypal!.Email,
    phone: this.store.getter().Paypal!.Phone,
    country: this.store.getter().Paypal!.Country,
    zoneinfo: this.store.getter().Paypal!.Zoneinfo,
    verified: this.store.getter().Paypal!.Verified
  };

  constructor(props?: {}) {
    super(props);
  }

  public render(): VElement {
    return (
      <article class="plate">
        <header class="plate__brand">
          <i class="fab fa-paypal fa-2x" style="color: #0D96D9;" />
          <h3 class="plate__title">Paypal</h3>
        </header>
        <div class="plate__container paypal-plate">
          <aside class="details">
            <p class="label__title">{lang.Paypal.username}</p>
            <p class="label__value">{this.state.username}</p>
            <p class="label__title">{lang.Paypal.email}</p>
            <p class="label__value label__no-capitalize paypal--color-blue">
              {this.state.email}
            </p>
            <p class="label__title">{lang.Paypal.phoneNumber}</p>
            <p class="label__value paypal--color-blue label__last">
              {this.state.phone}
            </p>
          </aside>
          <aside class="details">
            <p class="label__title">{lang.Paypal.country}</p>
            <p class="label__value paypal--color-blue">{this.state.country}</p>
            <p class="label__title">{lang.Paypal.type}</p>
            <p class="label__value paypal--color-card">
              {this.state.verified
                ? lang.Paypal.verified
                : lang.Paypal.unverified}
            </p>
            <p class="label__title">{lang.Paypal.location}</p>
            <p class="label__value paypal--color-blue label__last">
              {this.state.zoneinfo}
            </p>
          </aside>
        </div>
      </article>
    );
  }
}
