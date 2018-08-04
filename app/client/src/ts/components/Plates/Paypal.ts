import { Component } from "../Component";

interface IData {
  username: string;
  email: string;
  avatar: string;
  connectedCard: string;
  type: string;
  amount: string;
}

export class PaypalPlate extends Component {
  protected template: string;
  protected templateID: string = "paypal-plate";

  constructor(data: IData) {
    super();
    this.create(data);
  }

  /**
   * Update component
   *
   * @memberof DigitalOceanPlate
   */
  public update() {
    // FILL
  }

  /**
   * Invokes all methods after creating component
   *
   * @memberof Search
   */
  public postProcess() {
    // FILL
  }

  /**
   * Invokes all needed methods to create plate
   *
   * @protected
   * @param {IData} data
   * @memberof DigitalOceanPlate
   */
  protected create(data: IData) {
    this._createTemplate(data);
  }

  protected _createTemplate(data: IData): void {
    this.template = `<header class="plate__brand">
    <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
    <h3 class="plate__title">Paypal</h3>
</header>
<div class="plate__container paypal-plate">
    <aside class="container__details">
        <p class="item__title">Nazwa użytkownika</p>
        <p class="item__value">${data.username}</p>
        <p class="item__title">Środki na koncie</p>
        <p class="item__value paypal--color-blue">${data.amount}</p>
        <p class="item__title">Połączona karta</p>
        <p class="item__value item__value--last paypal--color-card">${
          data.connectedCard
        }</p>
    </aside>
    <div class="container__other">
        <aside class="container__aside">
            <div class="flex">
                <img src="${data.avatar}" alt="avatar" class="profile__avatar">
                <div>
                    <p class="item__title">Typ konta</p>
                    <p class="item__value">${data.type}</p>
                </div>
            </div>
            <div>
                <p class="item__title">Email</p>
                <p class="item__value paypal--color-blue">${data.email}</p>
            </div>
        </aside>
        <aside class="container__buttons">
            <button class="item__btn--green">Wpłać</button>
            <button class="item__btn--red">Wypłać</button>
        </aside>
    </div>
</div>`;
  }
}
