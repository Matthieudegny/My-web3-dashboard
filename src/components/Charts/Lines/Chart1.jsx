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
          if (value > 0) {
            return `${label}: +${value}%`;
          }
          if (value < 0) {
            return `${label}: ${value}%`;
          }
          if (value == 0) {
            return "0%";
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
          if (value === 0) return "0%";
          else {
            return value + "%";
          }
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

function LineChart({ datas, labels }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "BTC",
        data: datas[0],
        borderColor: (context) => {
          const ctx = context.chart.ctx;
          const gradientStroke = ctx.createLinearGradient(0, 500, 0, 200);
          gradientStroke.addColorStop(1, "#f29d22");
          gradientStroke.addColorStop(0, "#835410");
          return gradientStroke;
        },
        backgroundColor: "#f29d22",
        //courbe
        tension: 0.1,
      },
      {
        label: "NSQ",
        data: datas[1],
        borderColor: (context) => {
          const ctx = context.chart.ctx;
          const gradientStroke = ctx.createLinearGradient(0, 500, 0, 200);
          gradientStroke.addColorStop(0, "#330852");
          gradientStroke.addColorStop(1, "#820cd6");
          return gradientStroke;
        },
        backgroundColor: "#820cd6",
        tension: 0.1,
      },
      {
        label: "Portefolio",
        data: datas[2],
        borderColor: (context) => {
          const ctx = context.chart.ctx;
          const gradientStroke = ctx.createLinearGradient(0, 500, 0, 200);
          gradientStroke.addColorStop(0, "#096680");
          gradientStroke.addColorStop(1, "#06B5E6");
          return gradientStroke;
        },
        backgroundColor: "#06B5E6",
        tension: 0.1,
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default LineChart;
