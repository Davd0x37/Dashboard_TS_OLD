import { PlateComponent } from "../Component";

interface IData {
  username: string;
  email: string;
  type: string;
  expire: string;
}

class SpotifyPlate extends PlateComponent {
  protected template: string;
  protected userData: IData = {
    username: "Jon Doe",
    email: "doe@doe.com",
    type: "Premium",
    expire: "13 dni"
  };

  constructor() {
    super();
  }

  /**
   * Invoke all needed methods to create component
   *
   * @memberof FacebookPlate
   */
  public create(): void {
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
   * Invokes all methods after creating component
   *
   * @memberof Search
   */
  public postProcess() {
    // FILL
  }

  protected view(): void {
    this.template = `<header class="plate__brand">
  <i class="fab fa-spotify fa-2x" style="color: #B5EB00;"></i>
  <h3 class="plate__title">Spotify</h3>
</header>
<div class="plate__container spotify-plate">
  <aside class="container__details">
    <p class="label__title">Nazwa użytkownika</p>
    <p class="label__value">${this.userData.username}</p>
    <p class="label__title">Email</p>
    <p class="label__value">${this.userData.email}</p>
    <p class="label__title">Typ konta</p>
    <p class="label__value label__value--last spotify__title--color">${
      this.userData.type
    }
    </p>
  </aside>
  <div class="container__other">
    <p class="label__value">Termin wygaśnięcia subskrypcji</p>
    <p class="label__value spotify__title--color">${this.userData.expire}</p>
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

export default new SpotifyPlate();
