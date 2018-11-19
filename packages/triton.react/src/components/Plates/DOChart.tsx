import React, { Component } from "react";
import { Chart } from "chart.js";
// @ts-ignore
import DOConfig from "./DigitalOceanData.json";

class DOChart extends Component {
  protected canvas!: HTMLCanvasElement;
  protected ctx!: CanvasRenderingContext2D;

  render() {
    return (
      <div className="chart">
        <canvas
          id="digital_ocean_chart"
          className="chart__canvas"
          width="550px"
          height="90px"
        />
      </div>
    );
  }

  public componentDidMount() {
    // Get canvas
    this.canvas = document.querySelector(
      "#digital_ocean_chart"
    ) as HTMLCanvasElement;
    // Get context
    this.ctx = this.canvas.getContext("2d")!;
    // Modify background colors in dataset
    this._modifyDataset();
    // Create chart
    this._createChart();
  }

  protected _createChart() {
    new Chart(this.ctx, {
      type: "line",
      // @ts-ignore
      data: {
        labels: DOConfig.labels,
        datasets: DOConfig.dataset
      },
      options: DOConfig.options
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
    DOConfig.dataset.forEach((el: any) => {
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

export default DOChart;
