import Storage from "../../controller/Storage";
import { PlateComponent } from "../Component";

class PaypalPlate extends PlateComponent {
  constructor() {
    super();
  }

  public create(): void {
    const template = this.view();
    this.createPlate(template);
  }

  public update(): void {
    const template = this.view();
    this.article.innerHTML = template;
  }

  protected view(): string {
    const data: any = Storage.store.services!.paypal;
    return `<header class="plate__brand">
    <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
    <h3 class="plate__title">Paypal</h3>
  </header>
  <div class="plate__container paypal-plate">
    <aside class="container__details">
      <p class="label__title">Nazwa użytkownika</p>
      <p class="label__value">${data.username}</p>
      <p class="label__title">Email</p>
      <p class="label__value label__value--no-capitalize paypal--color-blue">${data.email}</p>
      <p class="label__title">Numer telefonu</p>
      <p class="label__value paypal--color-blue label__value--last">${data.phone}</p>
    </aside>
    <aside class="container__details">
      <p class="label__title">Typ konta</p>
      <p class="label__value paypal--color-card">${data.verified}</p>
      <p class="label__title">Kraj</p>
      <p class="label__value paypal--color-blue">${data.country}</p>
      <p class="label__title">Miejscowość</p>
      <p class="label__value paypal--color-blue label__value--last">${data.zoneinfo}
      </p>
    </aside>
    <aside class="container__details">
      <p class="label__title">Język</p>
      <p class="label__value label__value--last">${data.language}</p>
    </aside>
  </div>`;
  }

  protected controller(): void {
    // FILL
  }
}

export default new PaypalPlate();
