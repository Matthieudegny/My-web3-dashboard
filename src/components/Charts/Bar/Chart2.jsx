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
      text: "Trades triés par mois",
      font: {
        size: 20,
      },
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

function BarChart({ datas, labels }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Trades gagnés",
        data: datas[0],
        backgroundColor: "rgb(6, 181, 230)",
        stack: "Stack 1",
      },
      {
        label: "Trades perdus",
        data: datas[1],
        backgroundColor: "#550f87",
        stack: "Stack 2",
      },
      {
        label: "BE/en profit",
        data: datas[2],
        backgroundColor: "#0f3780",
        stack: "Stack 3",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ zIndex: "50" }} />;
}

export default BarChart;
