import { PlateComponent } from "../components/Component";
import Header from "../components/Header";
import Plates from "../components/Plates";
import Storage from "./Storage";

export const View = {
  viewRenderer: document.querySelector(".feed__actions > .plate__container"),
  /**
   * Generate plates at startup
   *
   * @returns {Promise<void>}
   */
  renderPlates(): void {
    Plates.forEach((plate: PlateComponent) => {
      plate.addPlate();
    });
  },

  /**
   * Update paltes
   *
   * @param {string} id
   * @returns {Promise<void>}
   */
  async updatePlates(id: string): Promise<void> {
    Storage.create(id);
    Plates.forEach((plate: PlateComponent) => {
      plate.update();
    });
  },

  /**
   * Render header
   *
   * @returns {Promise<void>}
   */
  renderHeader(): void {
    Header.create();
  },

  /**
   * Render default view
   *
   * @param {string} view
   * @returns {Promise<void>}
   */
  renderView(view: string): void {
    this.viewRenderer.innerHTML = view;
  }
};
