import { Chart } from "chart.js";
import { Component, Method, Prop } from "../decorators";
import Triton from "../lib/Triton";
import { $ } from "../utils/DOM";
import DigitalOceanConfig from "./data.json";

@Component()
class DigitalOcean extends Triton {
  @Prop()
  protected canvas!: HTMLCanvasElement;
  @Prop()
  protected ctx!: CanvasRenderingContext2D;
  @Prop()
  protected chart!: Chart;

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
          <p class="label__value label__no-capitalize">${this.store.getter.DigitalOcean.email}</p>
          <p class="label__title">Ostatnio utworzony droplet</p>
          <p class="label__value label__last digital_ocean--color">${
            this.store.getter.DigitalOcean.lastCreatedDroplet
          } dni temu</p>
        </aside>
        <aside class="wrap">
          <p class="label__title">Limit dropletow</p>
          <p class="label__value digital_ocean--color">${this.store.getter.DigitalOcean.dropletLimit}</p>
          <p class="label__title">Dropletów</p>
          <p class="label__value label__last digital_ocean--color">${this.store.getter.DigitalOcean.total}</p>
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

  @Method()
  public mounted(): void {
    // Get canvas
    this.canvas = $("#digital_ocean_chart")! as HTMLCanvasElement;
    // Get context
    this.ctx = this.canvas.getContext("2d")!;
    // Modify background colors in dataset
    this._modifyDataset();
    // Create chart
    this._createChart();
  }

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

  protected _createGradient(start: string, stop: string): CanvasGradient {
    const cv = this.canvas;
    const gradient = this.ctx.createLinearGradient(0, cv.height / 2, cv.width, cv.height / 2);
    gradient.addColorStop(0, start);
    gradient.addColorStop(1, stop);
    return gradient;
  }

  protected _modifyDataset(): void {
    DigitalOceanConfig.dataset.forEach((el: any) => {
      if (el.backgroundColor.hasOwnProperty("start") && el.backgroundColor.hasOwnProperty("stop")) {
        el.backgroundColor = this._createGradient(el.backgroundColor.start, el.backgroundColor.stop);
      }
    });
  }
}

export default new DigitalOcean();
