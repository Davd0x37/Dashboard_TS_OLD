import App from "../App";
import { PlateComponent } from "../components/Component";
import Header from "../components/Header";
import Plates, {
  DigitalOceanPlate,
  FacebookPlate,
  PaypalPlate,
  SpotifyPlate
} from "../components/Plates";

export const View = {
  viewRenderer: document.querySelector(".feed__actions > .plate__container"),
  /**
   * Generate plates at startup
   *
   * @param {Element} where
   * @param {any[]} plates
   * @memberof App
   */
  renderPlates(
    plates: PlateComponent[] = Plates,
    where: Element = document.querySelector(".feed")
  ) {
    plates.forEach((plate: PlateComponent) => {
      where.appendChild(plate.createPlate());
      plate.postProcess();
    });
  },

  renderHeader() {
    Header.create();
  },

  /**
   * Render default view
   *
   * @param {EView} view
   */
  renderView(view: string) {
    this.viewRenderer.innerHTML = view;
  }
};
