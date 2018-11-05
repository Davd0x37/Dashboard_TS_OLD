import Triton from "#/lib/Triton";

class Paypal extends Triton {
  constructor() {
    super();
  }

  public render() {
    return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
      <h3 class="plate__title">Paypal</h3>
    </header>
    <div class="plate__container paypal-plate">
      <aside class="details">
        <p class="label__title">${this.lang.Paypal.username}</p>
        <p class="label__value">${this.store.getter.Paypal!.Username}</p>
        <p class="label__title">${this.lang.Paypal.email}</p>
        <p class="label__value label__no-capitalize paypal--color-blue">${this.store.getter.Paypal!.Email}</p>
        <p class="label__title">${this.lang.Paypal.phoneNumber}</p>
        <p class="label__value paypal--color-blue label__last">${this.store.getter.Paypal!.Phone}</p>
      </aside>
      <aside class="details">
        <p class="label__title">${this.lang.Paypal.country}</p>
        <p class="label__value paypal--color-blue">${this.store.getter.Paypal!.Country}</p>
        <p class="label__title">${this.lang.Paypal.type}</p>
        <p class="label__value paypal--color-card">${
          this.store.getter.Paypal!.Verified ? this.lang.Paypal.verified : this.lang.Paypal.unverified
        }</p>
        <p class="label__title">${this.lang.Paypal.location}</p>
        <p class="label__value paypal--color-blue label__last">${this.store.getter.Paypal!.Zoneinfo}
        </p>
      </aside>
    </div>
  </article>`;
  }

  public mounted() {
    //
  }
}

export default new Paypal();
