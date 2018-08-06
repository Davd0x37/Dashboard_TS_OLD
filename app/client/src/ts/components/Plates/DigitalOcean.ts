import { Chart } from "chart.js";
import { PlateComponent } from "../Component";
import DigitalOceanConfig from "./DigitalOcean.json";

interface IData {
  username: string;
  email: string;
  amount: string;
  droplets: string;
  usage: string;
}

class DigitalOceanPlate extends PlateComponent {
  protected template: string;
  protected element: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected chart: Chart;
  protected userData: IData = {
    username: "Jon Doe",
    email: "jon@pm.me",
    amount: "$200.00",
    droplets: "1",
    usage: "$0.00"
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
   * Generate template for DigitalOcean plate
   *
   * @protected
   * @param {IData} data
   * @memberof DigitalOceanPlate
   */
  protected view(): void {
    this.template = `<header class="plate__brand">
  <i class="fab fa-digital-ocean fa-2x" style="color: #0080FF;"></i>
  <h3 class="plate__title">Digital Ocean</h3>
</header>
<div class="plate__container digital-ocean-plate">
  <div class="container__details">
    <aside class="container__wrap">
      <p class="label__title">Nazwa użytkownika</p>
      <p class="label__value">${this.userData.username}</p>
      <p class="label__title">Email</p>
      <p class="label__value label__value--last">${this.userData.email}</p>
    </aside>
    <aside class="container__wrap">
      <p class="label__title">Środki na koncie</p>
      <p class="label__value digital_ocean--color">${this.userData.amount}
      </p>
      <p class="label__title">Dropletow</p>
      <p class="label__value label__value--last digital_ocean--color">${
        this.userData.droplets
      }
      </p>
    </aside>
    <aside class="container__wrap">
      <div class="container__item">
        <p class="label__title">Zużycie środkow</p>
        <p class="label__value digital_ocean--color">${this.userData.usage}
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
   * Controll buttons and all data
   *
   * @protected
   * @memberof FacebookPlate
   */
  protected controller(): void {
    // FILL
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
      if (
        el.backgroundColor.hasOwnProperty("start") &&
        el.backgroundColor.hasOwnProperty("stop")
      ) {
        el.backgroundColor = this._createGradient(
          el.backgroundColor.start,
          el.backgroundColor.stop
        );
      }
    });
  }
}

export default new DigitalOceanPlate();
