import { Chart } from "chart.js";
import {Component} from './Component'
import DigitalOceanConfig from "./DigitalOcean.json";

export class DigitalOcean extends Component {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(elem: string) {
    super(elem)
    this.canvas = document.querySelector(elem);
    this.ctx = this.canvas.getContext("2d");

    // Must be fired up before create method
    this.readDataset(DigitalOceanConfig.dataset);
    this.create();
  }

  /**
   * Update chart
   *
   * @memberof DigitalOcean
   */
  public update(): void {
    // ADD IN FUTURE
  }

  
  /**
   * Create chart
   *
   * @protected
   * @memberof DigitalOcean
   */
  protected create() {
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
   * Create gradient
   *
   * @private
   * @param {string} start
   * @param {string} stop
   * @returns {CanvasGradient}
   * @memberof DigitalOcean
   */
  private _createGradient(start: string, stop: string): CanvasGradient {
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
   * Replace string from dataset with canvas gradient object
   *
   * @private
   * @param {object[]} dataset
   * @returns {object[]}
   * @memberof DigitalOcean
   */
  private readDataset(dataset: object[]): object[] {
    dataset.forEach((el: any) => {
      el.backgroundColor = this._createGradient(
        el.backgroundColor.start,
        el.backgroundColor.stop
      );
    });
    return dataset;
  }
}
