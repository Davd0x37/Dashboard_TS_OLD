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
   * @param {PlateComponent[]} [plates=Plates]
   * @param {Element} [where=document.querySelector(".feed")]
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

  /**
   * Render header
   *
   */
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
