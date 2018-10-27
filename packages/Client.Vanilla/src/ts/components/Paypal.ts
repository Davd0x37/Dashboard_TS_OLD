import { Component, Method } from "../decorators";
import Triton from "../lib/Triton";

@Component()
class Paypal extends Triton {
  constructor() {
    super();
  }

  @Method()
  public render() {
    return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
      <h3 class="plate__title">Paypal</h3>
    </header>
    <div class="plate__container paypal-plate">
      <aside class="details">
        <p class="label__title">${this.lang.data.Paypal.username}</p>
        <p class="label__value">${this.store.getter.Paypal.username}</p>
        <p class="label__title">${this.lang.data.Paypal.email}</p>
        <p class="label__value label__no-capitalize paypal--color-blue">${this.store.getter.Paypal.email}</p>
        <p class="label__title">${this.lang.data.Paypal.phoneNumber}</p>
        <p class="label__value paypal--color-blue label__last">${this.store.getter.Paypal.phone}</p>
      </aside>
      <aside class="details">
        <p class="label__title">${this.lang.data.Paypal.country}</p>
        <p class="label__value paypal--color-blue">${this.store.getter.Paypal.country}</p>
        <p class="label__title">${this.lang.data.Paypal.type}</p>
        <p class="label__value paypal--color-card">${
          this.store.getter.Paypal.verified ? this.lang.data.Paypal.verified : this.lang.data.Paypal.unverified
        }</p>
        <p class="label__title">${this.lang.data.Paypal.location}</p>
        <p class="label__value paypal--color-blue label__last">${this.store.getter.Paypal.zoneinfo}
        </p>
      </aside>
    </div>
  </article>`;
  }
}

export default new Paypal();
