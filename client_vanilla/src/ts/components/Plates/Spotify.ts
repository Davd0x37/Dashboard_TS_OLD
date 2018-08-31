import Storage from "../../controller/Storage";
import { PlateComponent } from "../Component";

class SpotifyPlate extends PlateComponent {
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
    const data = Storage.store.services.spotify;
    return `<header class="plate__brand">
  <i class="fab fa-spotify fa-2x" style="color: #B5EB00;"></i>
  <h3 class="plate__title">Spotify</h3>
</header>
<div class="plate__container spotify-plate">
  <aside class="container__details">
    <p class="label__title">Nazwa użytkownika</p>
    <p class="label__value">${data.username}</p>
    <p class="label__title">Email</p>
    <p class="label__value label__value--no-capitalize">${data.email}</p>
    <p class="label__title">Typ konta</p>
    <p class="label__value label__value--last spotify__title--color">${
      data.type
    }
    </p>
  </aside>
</div>`;
  }

  protected controller(): void {
    // FILL
  }
}

export default new SpotifyPlate();
