import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  //set up period circle size
  radius: 5,
  //set up points hover dont need to be on it but near its ok
  hitRadius: 30,
  //increase the size of the point on hover
  hoverRadius: 12,
  hoverBorderWidth: 10,
  hoverBackgroundColor: "white",
  //follow his parent
  responsive: true,
  plugins: {
    tooltip: {
      bodyFont: {
        size: 15,
      },
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          console.log(context.dataset.label);
          let value = parseInt(context.formattedValue, 10);
          console.log(value);
          if (value >= 1) {
            return `${label}: + ${value}%`;
          }
          if (value < 0) {
            return `${label}:- ${value}%`;
          }
        },
      },
    },
    legend: {
      position: "top",
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 20,
        },
      },
    },
    title: {
      display: true,
      text: "",
    },
  },
  //afficher les elements => points
  elements: {
    point: {
      pointBorderColor: "rgba(0,0,0)",
    },
  },
  //modifier l'axe x et y
  scales: {
    y: {
      ticks: {
        color: "white",
        //allow to add description at y ticks, for these example -> $200m
        callback: function (value) {
          return value + "%";
        },
        font: {
          size: 20,
        },
      },
      // suggestedMin: 2,
      // suggestedMax: 5,
    },
    x: {
      ticks: {
        color: "white",
        font: {
          size: 20,
        },
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

export const data = {
  labels,
  datasets: [
    {
      label: "BTC",
      data: [2, 2.5, 2.8, 2.3, 2.8, 3.5],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      //courbe
      tension: 0.5,
    },
    {
      label: "NSQ",
      data: [2, 2.1, 2.3, 2.3, 2.5, 2.7],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.5,
    },
    {
      label: "Portefolio",
      data: [2, 2.7, 3, 2.8, 3.4, 3.8],
      borderColor: "rgb(6, 181, 230)",
      backgroundColor: "rgb(6, 181, 230)",
      tension: 0.5,
    },
  ],
};

function LineChart() {
  return <Line options={options} data={data} />;
}

export default LineChart;
