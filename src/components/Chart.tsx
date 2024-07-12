import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface ChartProps {
  data: number[];
  volume: number[];
}

const Chart: React.FC<ChartProps> = ({ data, volume }) => {
  const maxVolume = Math.max(...volume);
  const normalizedVolume = volume.map((v) => (v / maxVolume) * 10); // Normalize volume data

  const chartData = {
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
        // categoryPercentage: 0.1,
        yAxisID: "y1",
      },
      {
        type: "line",
        label: "Value",
        data: data,
        fill: "start",
        borderColor: "#4B40EE",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
          gradient.addColorStop(0, "#c2bef9");
          gradient.addColorStop(1, "#fff");
          return gradient;
        },
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.1,
        yAxisID: "y",
      },
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
      <div className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white text-sm px-2 py-1 rounded shadow">
        64,850.35
      </div>
      <div className="absolute bottom-0 right-0 mb-2 mr-2 bg-blue-700 text-white text-sm px-2 py-1 rounded shadow">
        63,179.71
      </div>
    </div>
  );
};

export default Chart;
