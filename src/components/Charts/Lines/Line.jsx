import React, { useContext, useEffect } from "react";

//import context
import { DashBoardContext } from "../../../Context/Context";

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
          let value = context.raw;
          if (value >= 1) {
            return `${label}: +${value}%`;
          }
          if (value < 0) {
            return `${label}: ${value}%`;
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
      text: "Performance NSQ, BTC, Portefeuille par semaine",
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

function LineChart() {
  const { percBTC, percNSQ } = useContext(DashBoardContext);

  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthToDisplay = [];
  let today = new Date();
  let result;
  let month;

  for (let i = 6; i > 0; i -= 1) {
    result = new Date(today.getFullYear(), today.getMonth() - i, 1);
    month = monthNames[result.getMonth()];
    monthToDisplay.push(month);
  }

  const data = {
    labels: monthToDisplay,
    datasets: [
      {
        label: "BTC",
        data: percBTC,
        borderColor: (context) => {
          const ctx = context.chart.ctx;
          const gradientStroke = ctx.createLinearGradient(0, 500, 0, 200);
          gradientStroke.addColorStop(1, "red");
          gradientStroke.addColorStop(0, "yellow");
          return gradientStroke;
        },
        backgroundColor: "#550F87",
        //courbe
        tension: 0.5,
      },
      {
        label: "NSQ",
        data: percNSQ,
        borderColor: (context) => {
          const ctx = context.chart.ctx;
          const gradientStroke = ctx.createLinearGradient(0, 500, 0, 0);
          gradientStroke.addColorStop(0, "#150D71");
          gradientStroke.addColorStop(1, "#1907E6");
          return gradientStroke;
        },
        backgroundColor: "#170AAC",
        tension: 0.5,
      },
      {
        label: "Portefolio",
        data: [2, 2.7, 3, "2.8", "-3.4", 20.8],
        borderColor: (context) => {
          const ctx = context.chart.ctx;
          const gradientStroke = ctx.createLinearGradient(0, 500, 0, 0);
          gradientStroke.addColorStop(0, "#096680");
          gradientStroke.addColorStop(1, "#06B5E6");
          return gradientStroke;
        },
        backgroundColor: "#096680",
        tension: 0.5,
      },
    ],
  };
  return <Line options={options} data={data} style={{ zIndex: "50" }} />;
}

export default LineChart;
