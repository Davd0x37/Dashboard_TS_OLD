import { Chart } from "chart.js";
import { Component } from "../Component";
import DigitalOceanConfig from "./DigitalOcean.json";

interface IData {
  username: string;
  email: string;
  amount: string;
  droplets: string;
  usage: string;
}

export class DigitalOceanPlate extends Component {
  protected template: string;
  protected element: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected chart: Chart;

  constructor(
    data: IData = {
      username: "Jon Doe",
      email: "jon@pm.me",
      amount: "$200.00",
      droplets: "1",
      usage: "$0.00"
    }
  ) {
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
    // Get canvas
    this.element = this.articleRef.querySelector("#digital_ocean_chart");
    // Get context
    this.ctx = this.element.getContext("2d");
    // Modify background colors in dataset
    this._modifyDataset();
    // Create chart
    this._createChart();
  }

  /**
   * Invokes all needed methods to create plate and chart
   *
   * @protected
   * @param {IData} data
   * @memberof DigitalOceanPlate
   */
  protected create(data: IData) {
    this._createTemplate(data);
  }

  /**
   * Create chart
   *
   * @protected
   * @memberof DigitalOceanPlate
   */
  protected _createChart() {
    this.chart = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: DigitalOceanConfig.labels,
        datasets: DigitalOceanConfig.dataset
      },
      options: DigitalOceanConfig.options
    });
  }

  /**
   * Generate template for DigitalOcean plate
   *
   * @protected
   * @param {IData} data
   * @memberof DigitalOceanPlate
   */
  protected _createTemplate(data: IData): void {
    this.template = `<header class="plate__brand">
  <i class="fab fa-digital-ocean fa-2x" style="color: #0080FF;"></i>
  <h3 class="plate__title">Digital Ocean</h3>
</header>
<div class="plate__container digital-ocean-plate">
  <div class="container__details">
    <aside class="container__wrap">
      <p class="item__title">Nazwa użytkownika</p>
      <p class="item__value">${data.username}</p>
      <p class="item__title">Email</p>
      <p class="item__value item__value--last">${data.email}</p>
    </aside>
    <aside class="container__wrap">
      <p class="item__title">Środki na koncie</p>
      <p class="item__value digital_ocean--color">${data.amount}
      </p>
      <p class="item__title">Dropletow</p>
      <p class="item__value item__value--last digital_ocean--color">${
        data.droplets
      }
      </p>
    </aside>
    <aside class="container__wrap">
      <div class="container__item">
        <p class="item__title">Zużycie środkow</p>
        <p class="item__value digital_ocean--color">${data.usage}
        </p>
      </div>
      <button class="item__btn">Doładuj</button>
    </aside>
  </div>
  <div class="container__other">
    <div class="chart">
      <canvas id="digital_ocean_chart" class="chart__canvas" width="550px" height="90px"></canvas>
    </div>
  </div>
</div>`;
  }

  /**
   * Create gradient
   *
   * @protected
   * @param {string} start
   * @param {string} stop
   * @returns {CanvasGradient}
   * @memberof DigitalOceanPlate
   */
  protected _createGradient(start: string, stop: string): CanvasGradient {
    const cv = this.element;
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
   * @protected
   * @param {object[]} dataset
   * @memberof DigitalOceanPlate
   */
  protected _modifyDataset(): void {
    DigitalOceanConfig.dataset.forEach((el: any) => {
      el.backgroundColor = this._createGradient(
        el.backgroundColor.start,
        el.backgroundColor.stop
      );
    });
  }
}
