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

  protected userData: IData = {
    username: "Jon doe",
    email: "jondoe@gmail.com",
    type: "Osobiste",
    amount: "$200.00",
    connectedCard: "VISA",
    avatar: "./avatar.f01dff67.png"
  };

  constructor(data?: IData) {
    super();
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
   * Update component
   *
   * @memberof FacebookPlate
   */
  public update(): void {
    // FILL
  }

  /**
   * Invoke all needed methods to create component
   *
   * @protected
   * @memberof FacebookPlate
   */
  protected create(): void {
    // FILL
  }

  protected view(): void {
    this.template = `<header class="plate__brand">
    <i class="fab fa-paypal fa-2x" style="color: #0D96D9;"></i>
    <h3 class="plate__title">Paypal</h3>
</header>
<div class="plate__container paypal-plate">
    <aside class="container__details">
        <p class="item__title">Nazwa użytkownika</p>
        <p class="item__value">${this.userData.username}</p>
        <p class="item__title">Środki na koncie</p>
        <p class="item__value paypal--color-blue">${this.userData.amount}</p>
        <p class="item__title">Połączona karta</p>
        <p class="item__value item__value--last paypal--color-card">${
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
                    <p class="item__title">Typ konta</p>
                    <p class="item__value">${this.userData.type}</p>
                </div>
            </div>
            <div>
                <p class="item__title">Email</p>
                <p class="item__value paypal--color-blue">${
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
   * @memberof FacebookPlate
   */
  protected controller(): void {
    // FILL
  }
}
