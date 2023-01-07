import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Trades triés par résultat",
      font: {
        size: 20,
      },
    },
    legend: {
      display: false,
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

function BarChart({ datas }) {
  const data = {
    labels: [
      "<-5000$",
      "-5000/-2500$",
      "-2500/-500$",
      "-500/0$",
      "0/500$",
      "500/2500$",
      "2500/5000$",
      ">5000$",
    ],
    datasets: [
      {
        data: datas,
        backgroundColor: (context) => {
          if (context.dataIndex === 0) return "#870f68";
          if (context.dataIndex === 1) return "#550f87";
          if (context.dataIndex === 2) return "#550f87";
          if (context.dataIndex === 3) return "#0f3780";
          if (context.dataIndex === 4) return "#0f3780";
          if (context.dataIndex === 5) return "#0687e6";
          if (context.dataIndex === 6) return "#0687e6";
          if (context.dataIndex === 7) return "#15e8fc";
        },
        stack: "Stack 1",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ zIndex: "50" }} />;
}

export default BarChart;
