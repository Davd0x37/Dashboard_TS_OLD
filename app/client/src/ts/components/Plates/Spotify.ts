import { Component } from "../Component";

interface IData {
  username: string;
  email: string;
  type: string;
  expire: string;
}

export class SpotifyPlate extends Component {
  protected template: string;
  protected userData: IData = {
    username: "Jon Doe",
    email: "doe@doe.com",
    type: "Premium",
    expire: "13 dni"
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
  <i class="fab fa-spotify fa-2x" style="color: #B5EB00;"></i>
  <h3 class="plate__title">Spotify</h3>
</header>
<div class="plate__container spotify-plate">
  <aside class="container__details">
    <p class="item__title">Nazwa użytkownika</p>
    <p class="item__value">${this.userData.username}</p>
    <p class="item__title">Email</p>
    <p class="item__value">${this.userData.email}</p>
    <p class="item__title">Typ konta</p>
    <p class="item__value item__value--last spotify__title--color">${
      this.userData.type
    }
    </p>
  </aside>
  <div class="container__other">
    <p class="item__value">Termin wygaśnięcia subskrypcji</p>
    <p class="item__value spotify__title--color">${this.userData.expire}</p>
    <button class="item__btn">Przedłuż</button>
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
