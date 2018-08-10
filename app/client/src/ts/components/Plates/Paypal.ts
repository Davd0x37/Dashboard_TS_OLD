// Avatar
// @ts-ignore
import avatar from "../../../public/img/avatar.webp"

import { PlateComponent } from "../Component";

interface IData {
  username: string;
  email: string;
  avatar: string;
  connectedCard: string;
  type: string;
  amount: string;
}
class PaypalPlate extends PlateComponent {
  protected template: string;

  protected userData: IData = {
    username: "Jon doe",
    email: "jondoe@gmail.com",
    type: "Osobiste",
    amount: "$200.00",
    connectedCard: "VISA",
    avatar
  };

  constructor() {
    super();
  }

  /**
   * Invoke all needed methods to create component
   *
   * @memberof PaypalPlate
   */
  public create(): void {
    // FILL
  }

  /**
   * Update component
   *
   * @memberof PaypalPlate
   */
  public update(): void {
    // FILL
  }

  /**
   * Invokes all methods after creating component
   *
   * @memberof PaypalPlate
   */
  public postProcess() {
    // FILL
  }

  /**
   * Create and update view
   *
   * @protected
   * @memberof PaypalPlate
   */
  protected view(): void {
    this.template = `<header class="plate__brand">
    <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
    <h3 class="plate__title">Paypal</h3>
</header>
<div class="plate__container paypal-plate">
    <aside class="container__details">
        <p class="label__title">Nazwa użytkownika</p>
        <p class="label__value">${this.userData.username}</p>
        <p class="label__title">Środki na koncie</p>
        <p class="label__value paypal--color-blue">${this.userData.amount}</p>
        <p class="label__title">Połączona karta</p>
        <p class="label__value label__value--last paypal--color-card">${
          this.userData.connectedCard
        }</p>
    </aside>
    <div class="container__other">
        <aside class="container__aside">
            <div class="flex">
                <img src="${
                  this.userData.avatar
                }" alt="avatar" class="profile__avatar">
                <div>
                    <p class="label__title">Typ konta</p>
                    <p class="label__value">${this.userData.type}</p>
                </div>
            </div>
            <div>
                <p class="label__title">Email</p>
                <p class="label__value paypal--color-blue">${
                  this.userData.email
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

  /**
   * Controll buttons and all data
   *
   * @protected
   * @memberof PaypalPlate
   */
  protected controller(): void {
    // FILL
  }
}

export default new PaypalPlate();
