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
    const data = Storage.store.services.paypal;
    return `<header class="plate__brand">
    <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
    <h3 class="plate__title">Paypal</h3>
</header>
<div class="plate__container paypal-plate">
    <aside class="container__details">
        <p class="label__title">Nazwa użytkownika</p>
        <p class="label__value">${data.username}</p>
        <p class="label__title">Środki na koncie</p>
        <p class="label__value paypal--color-blue">${data.amount}</p>
        <p class="label__title">Połączona karta</p>
        <p class="label__value label__value--last paypal--color-card">${
          data.connectedCard
        }</p>
    </aside>
    <div class="container__other">
        <aside class="container__aside">
            <div class="flex">
                <img src="${data.avatar}" alt="avatar" class="profile__avatar">
                <div>
                    <p class="label__title">Typ konta</p>
                    <p class="label__value">${data.type}</p>
                </div>
            </div>
            <div>
                <p class="label__title">Email</p>
                <p class="label__value label__value--no-capitalize paypal--color-blue">${
                  data.email
                }</p>
            </div>
        </aside>
        <aside class="container__buttons">
            <button class="item__btn--green">Wpłać</button>
            <button class="item__btn--red">Wypłać</button>
        </aside>
    </div>
</div>`;
  }

  protected controller(): void {
    // FILL
  }
}

export default new PaypalPlate();
