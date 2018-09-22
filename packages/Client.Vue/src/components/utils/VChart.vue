<template>
  <div class="chart">
    <canvas id="digital_ocean_chart" class="chart__canvas" width="550px" height="90px"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Chart } from "chart.js";
import DigitalOceanConfig from "./DigitalOcean.json";

@Component
export default class VChart extends Vue {
  private canvas!: HTMLCanvasElement | null;
  private ctx!: CanvasRenderingContext2D | null;
  private chart!: Chart;

  public mounted() {
    this.canvas = this.$el.querySelector("#digital_ocean_chart");
    this.ctx = this.canvas!.getContext("2d");
    this._modifyDataset();
    this._createChart();
  }

  private _createChart(): void {
    this.chart = new Chart(this.ctx!, {
      type: "line",
      data: {
        labels: DigitalOceanConfig.labels,
        datasets: DigitalOceanConfig.dataset
      },
      options: DigitalOceanConfig.options
    });
  }

  private _modifyDataset(): void {
    DigitalOceanConfig.dataset.forEach((el: any) => {
      if (el.backgroundColor.hasOwnProperty("start") && el.backgroundColor.hasOwnProperty("stop")) {
        el.backgroundColor = this._createGradient(el.backgroundColor.start, el.backgroundColor.stop);
      }
    });
  }

  private _createGradient(start: string, stop: string): CanvasGradient {
    const cv = this.canvas!;
    const gradient = this.ctx!.createLinearGradient(0, cv.height / 2, cv.width, cv.height / 2);
    gradient.addColorStop(0, start);
    gradient.addColorStop(1, stop);
    return gradient;
  }
}
</script>
