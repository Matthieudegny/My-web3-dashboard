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
  Filler,
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
  Legend,
  Filler
);

let delayed;

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
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === "data" && context.mode === "default") {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },

  plugins: {
    tooltip: {
      bodyFont: {
        size: 15,
      },
      callbacks: {
        label: function (context) {
          console.log(context);
          // console.log(context.dataset.label);
          // console.log(context);
          let value = context.raw;
          if (value) {
            return `${value}$`;
          }
        },
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Evolution du portefeuille",
      font: {
        size: 20,
      },
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
          return value + "$";
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
      title: {
        display: true,
        text: "Nombre de positions",
        font: {
          size: 15,
        },
      },
    },
  },
};

const labels = ["1", "2", "3", "4", "5", "6"];

export const data = {
  labels,
  datasets: [
    {
      label: "Portefeuille",
      data: [20200, 23000, 25000, 23000, 22500, 28000],
      borderColor: "rgb(22, 25, 60)",
      fill: "start",
      backgroundColor: (context, chartArea) => {
        console.log(chartArea);
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 500, 0, 0);
        gradient.addColorStop(0, "rgb(6, 20, 230)");
        gradient.addColorStop(1, "rgb(6, 181, 230)");
        return gradient;
      },
      //courbe
      tension: 0.5,
    },
  ],
};

function LineChart() {
  return (
    <Line
      options={options}
      data={data}
      style={{ height: "400px", width: "100%", zIndex: "50" }}
    />
  );
}

export default LineChart;
