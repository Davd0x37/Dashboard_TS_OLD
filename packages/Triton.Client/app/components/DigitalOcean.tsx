import lang from "#/i18n";
import Component from "#/lib/Component";
import { VElement } from "#/vdom/Interfaces";
import { createElement } from "#/vdom/VDOM";
import { Chart } from "chart.js";
import DigitalOceanConfig from "./DigitalOceanData.json";

export default class DigitalOcean extends Component {
  protected canvas!: HTMLCanvasElement;
  protected ctx!: CanvasRenderingContext2D;
  protected chart!: typeof Chart;

  protected state = {
    email: this.store.getter().DigitalOcean!.Email,
    dropletlimit: this.store.getter().DigitalOcean!.DropletLimit,
    lastCreatedDroplet: this.store.getter().DigitalOcean!.LastCreatedDroplet,
    total: this.store.getter().DigitalOcean!.Total
  };

  constructor(props?: {}) {
    super(props);
  }

  public render(): VElement {
    return (
      <article class="plate">
        <header class="plate__brand">
          <i class="fab fa-digital-ocean fa-2x" style="color: #0080FF;" />
          <h3 class="plate__title">Digital Ocean</h3>
        </header>
        <div class="plate__container digital-ocean-plate">
          <div class="details">
            <aside class="wrap">
              <p class="label__title">{lang.DigitalOcean.email}</p>
              <p class="label__value label__no-capitalize">
                {this.state.email}
              </p>
              <p class="label__title">{lang.DigitalOcean.lastCreatedDroplet}</p>
              <p class="label__value label__last digital_ocean--color">
                {this.state.lastCreatedDroplet +
                  " " +
                  lang.DigitalOcean.hoursAgo}
              </p>
            </aside>
            <aside class="wrap">
              <p class="label__title">{lang.DigitalOcean.dropletLimit}</p>
              <p class="label__value digital_ocean--color">
                {this.state.dropletlimit}
              </p>
              <p class="label__title">{lang.DigitalOcean.droplets}</p>
              <p class="label__value label__last digital_ocean--color">
                {this.state.total}
              </p>
            </aside>
          </div>
          <div class="other">
            <div class="chart">
              <canvas
                id="digital_ocean_chart"
                class="chart__canvas"
                width="550px"
                height="90px"
              />
            </div>
          </div>
        </div>
      </article>
    );
  }

  public mounted() {
    const el = this.pCurrentElement.dom;
    if (el) {
      // Get canvas
      this.canvas = el.querySelector(
        "#digital_ocean_chart"
      ) as HTMLCanvasElement;
      // Get context
      this.ctx = this.canvas.getContext("2d")!;
      // Modify background colors in dataset
      this._modifyDataset();
      // Create chart
      this._createChart();
    }
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
