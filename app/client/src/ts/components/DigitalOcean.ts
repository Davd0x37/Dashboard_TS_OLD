import { Chart } from "chart.js";
import DigitalOceanConfig from "./DigitalOcean.json";

export class DigitalOcean {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(elem: string) {
    this.canvas = document.querySelector(elem);
    this.ctx = this.canvas.getContext("2d");

    // Must be fired up before create method
    this.readDataset(DigitalOceanConfig.dataset);
    this.create();
  }

  /**
   * Create chart
   */
  public create() {
    const chart = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: DigitalOceanConfig.labels,
        datasets: DigitalOceanConfig.dataset
      },
      options: DigitalOceanConfig.options
    });
  }

  /**
   * Create linear gradient from passed colors
   * @param {string} start
   * @param {string} stop
   * @returns {CanvasGradient}
   */
  private _createGradient(start: string, stop: string) {
    const cv = this.canvas;
    const gradient = this.ctx.createLinearGradient(
      0,
      cv.height / 2,
      cv.width,
      cv.height / 2
    );
    gradient.addColorStop(0, start);
    gradient.addColorStop(1, stop);
    return gradient;
  }

  /**
   * Create linear gradient in canvas using start/stop fields from json file
   * @param {object[]} dataset
   * @returns {object[]}
   */
  private readDataset(dataset: object[]) {
    dataset.forEach((el: any) => {
      el.backgroundColor = this._createGradient(
        el.backgroundColor.start,
        el.backgroundColor.stop
      );
    });
    return dataset;
  }
}
