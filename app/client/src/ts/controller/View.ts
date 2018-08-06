import App from "../App";
import { PlateComponent } from '../components/Component';
import Plates, {
  DigitalOceanPlate,
  FacebookPlate,
  PaypalPlate,
  SpotifyPlate
} from "../components/Plates";
import Search from "../components/Search";

enum EView {
  PAYPAL,
  DIGITALOCEAN,
  FACEBOOK,
  SPOTIFY
}

export const View = {
  /**
   * Generate plates at startup
   *
   * @param {Element} where
   * @param {any[]} plates
   * @memberof App
   */
  addPlates(
    plates: PlateComponent[] = Plates,
    where: Element = document.querySelector(".feed")
  ) {
    plates.forEach((plate: PlateComponent) => {
      where.appendChild(plate.renderPlate());
      plate.postProcess();
    });
  },

  /**
   * Init searchbar
   *
   */
  initSearch() {
    Search.create();
  },

  /**
   * Render default view
   *
   * @param {EView} view
   */
  renderView(view: EView) {
    switch (view) {
      case EView.PAYPAL: {
        // App.addPlates
      }
    }
  }
};
