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
      text: "Type de trade par mois",
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Total trades",
      data: [4, 5, 6, 2, 2, 8, 8],
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 0",
    },
    {
      label: "Trades gagnés",
      data: [2, 2, 1, 0, 0, 4, 5],
      backgroundColor: "rgb(75, 192, 192)",
      stack: "Stack 1",
    },
    {
      label: "Trades perdus",
      data: [0, 1, 2, 0, 1, 2, 2],
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 2",
    },
    {
      label: "BE/en profit",
      data: [1, 2, 2, 2, 0, 0, 1],
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 3",
    },
    {
      label: "Pertes rapides",
      data: [1, 0, 1, 0, 1, 2, 0],
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 3",
    },
  ],
};

function BarChart() {
  return <Bar options={options} data={data} style={{ zIndex: "50" }} />;
}

export default BarChart;
