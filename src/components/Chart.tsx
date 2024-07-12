import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import type { ChartData, ChartDataset } from "chart.js";

interface ChartProps {
  data: number[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartData = {
    labels: Array(data.length).fill(""),
    datasets: [
      {
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
      },
    ],
  };

  const options = {
    scales: {
      y: {
        display: false,
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
    <div className="flex relative mt-4 h-[350px] border-l border-r border-b w-[700px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
