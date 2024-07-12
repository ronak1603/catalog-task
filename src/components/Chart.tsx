import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import type { ChartData, ChartDataset } from "chart.js";

interface ChartProps {
  data: number[];
  volume: number[];
}

const Chart: React.FC<ChartProps> = ({ data, volume }) => {
  const maxVolume = Math.max(...volume);
  const normalizedVolume = volume.map((v) => (v / maxVolume) * 10); // Normalize volume data

  const chartData: ChartData<"line" | "bar", number[], any> = {
    labels: Array(data.length).fill(""),
    datasets: [
      {
        type: "bar",
        label: "Volume",
        data: normalizedVolume,
        backgroundColor: "#EFF1F3",
        borderColor: "#EFF1F3",
        borderWidth: 1,
        barPercentage: 0.3,
        yAxisID: "y1",
      } as ChartDataset<"bar", number[]>,
      {
        type: "line",
        label: "Value",
        data: data,
        borderColor: "#4B40EE",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
          gradient.addColorStop(0, "#c2bef9");
          gradient.addColorStop(1, "#fff");
          return gradient;
        },
        borderWidth: 2,
        tension: 0.1,
        yAxisID: "y",
      } as ChartDataset<"line", number[]>,
    ],
  };

  const options = {
    scales: {
      y: {
        display: false,
      },
      y1: {
        display: false,
        max: 100,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative mt-4 h-[350px] w-[700px] border-l border-r border-b">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
