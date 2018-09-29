// import { Chart } from "chart.js";
// import Storage from "~/controller/Storage";
// import { PlateComponent } from "../Component";
// import DigitalOceanConfig from "./data.json";
import "reflect-metadata";

import { Component, Method } from "../decorators";
import Triton from "../lib/Triton";

@Component()
export default class DigitalOceanPlate extends Triton {
  // @Prop()
  // private email: string = this.store.state.service.DigitalOcean.email;
  // @Prop()
  // private lastCreatedDroplet: string = this.store.state.service.DigitalOcean
  //   .lastCreatedDroplet;
  // @Prop()
  // private dropletLimit: string = this.store.state.service.DigitalOcean
  //   .dropletLimit;
  // @Prop()
  // private total: string = this.store.state.service.DigitalOcean.total;

  constructor() {
    super();
  }

  @Method()
  public render(): string {
    return /*html*/ `<article class="plate">
    <header class="plate__brand">
      <i class="fab fa-digital-ocean fa-2x" style="color: #0080FF;"></i>
      <h3 class="plate__title">Digital Ocean</h3>
    </header>
    <div class="plate__container digital-ocean-plate">
      <div class="details">
        <aside class="wrap">
          <p class="label__title">Email</p>
          <p class="label__value label__value--no-capitalize">${
            this.store.state.service.DigitalOcean.email
          }</p>
          <p class="label__title">Ostatnio utworzony droplet</p>
          <p class="label__value label__last digital_ocean--color">${
            this.store.state.service.DigitalOcean.lastCreatedDroplet
          } dni temu</p>
        </aside>
        <aside class="wrap">
          <p class="label__title">Limit dropletow</p>
          <p class="label__value digital_ocean--color">${
            this.store.state.service.DigitalOcean.dropletLimit
          }</p>
          <p class="label__title">Dropletów</p>
          <p class="label__value label__last digital_ocean--color">${
            this.store.state.service.DigitalOcean.total
          }</p>
        </aside>
      </div>
      <div class="other">
        <div class="chart">
          <canvas id="digital_ocean_chart" class="chart__canvas" width="550px" height="90px"></canvas>
        </div>
      </div>
    </div>
  </article>`;
  }
}

// class DigitalOceanPlate extends PlateComponent {
//   protected canvas: HTMLCanvasElement;
//   protected ctx: CanvasRenderingContext2D;
//   protected chart: Chart;

//   constructor() {
//     super();
//   }

//   public create(): void {
//     const template = this.view();
//     this.createPlate(template);
//     this.insertChart();
//   }

//   public update(): void {
//     const template = this.view();
//     this.article.innerHTML = template;
//     this.insertChart();
//   }

//   /**
//    * Generate template for DigitalOcean plate
//    *
//    * @protected
//    * @returns {string}
//    * @memberof DigitalOceanPlate
//    */
//   protected view(): string {
//     const data = Storage.store.services.digitalocean;
//     return ``;
//   }

//   protected controller() {
//     // FILL
//   }

//   protected insertChart() {
//     // Get canvas
//     this.canvas = this.article.querySelector("#digital_ocean_chart");
//     // Get context
//     this.ctx = this.canvas.getContext("2d");
//     // Modify background colors in dataset
//     this._modifyDataset();
//     // Create chart
//     this._createChart();
//   }

//   /**
//    * Create chart
//    *
//    * @protected
//    * @memberof DigitalOceanPlate
//    */
//   protected _createChart() {
//     this.chart = new Chart(this.ctx, {
//       type: "line",
//       data: {
//         labels: DigitalOceanConfig.labels,
//         datasets: DigitalOceanConfig.dataset
//       },
//       options: DigitalOceanConfig.options
//     });
//   }

//   /**
//    * Create gradient
//    *
//    * @protected
//    * @param {string} start
//    * @param {string} stop
//    * @returns {CanvasGradient}
//    * @memberof DigitalOceanPlate
//    */
//   protected _createGradient(start: string, stop: string): CanvasGradient {
//     const cv = this.canvas;
//     const gradient = this.ctx.createLinearGradient(0, cv.height / 2, cv.width, cv.height / 2);
//     gradient.addColorStop(0, start);
//     gradient.addColorStop(1, stop);
//     return gradient;
//   }

//   /**
//    * Replace string from dataset with canvas gradient object
//    *
//    * @protected
//    * @param {object[]} dataset
//    * @memberof DigitalOceanPlate
//    */
//   protected _modifyDataset(): void {
//     DigitalOceanConfig.dataset.forEach((el: any) => {
//       if (el.backgroundColor.hasOwnProperty("start") && el.backgroundColor.hasOwnProperty("stop")) {
//         el.backgroundColor = this._createGradient(el.backgroundColor.start, el.backgroundColor.stop);
//       }
//     });
//   }
// }

// export default new DigitalOceanPlate();
