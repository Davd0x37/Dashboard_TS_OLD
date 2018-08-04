import { Component } from "../Component";

interface IData {
  username: string;
  email: string;
  type: string;
  expire: string;
}

export class SpotifyPlate extends Component {
  protected template: string;
  protected templateID: string = "spotify-plate";

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
  <i class="fab fa-spotify fa-2x" style="color: #B5EB00;"></i>
  <h3 class="plate__title">Spotify</h3>
</header>
<div class="plate__container spotify-plate">
  <aside class="container__details">
    <p class="item__title">Nazwa użytkownika</p>
    <p class="item__value">${data.username}</p>
    <p class="item__title">Email</p>
    <p class="item__value">${data.email}</p>
    <p class="item__title">Typ konta</p>
    <p class="item__value item__value--last spotify__title--color">${data.type}
    </p>
  </aside>
  <div class="container__other">
    <p class="item__value">Termin wygaśnięcia subskrypcji</p>
    <p class="item__value spotify__title--color">${data.expire}</p>
    <button class="item__btn">Przedłuż</button>
  </div>
</div>`;
  }
}
