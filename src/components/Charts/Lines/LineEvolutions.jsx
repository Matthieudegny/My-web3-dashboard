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

export function LineChart() {
  const { balances } = useContext(DashBoardContext);

  const getLabelXChart = () => {
    let result = [];
    balances.map((balance, index) => {
      result.push(index + 1);
    });
    return result;
  };

  const getPositions = () => {
    let result = [...balances];
    return result.reverse();
  };

  let delayed;
  const options = {
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
    // animation: {
    //   onComplete: () => {
    //     delayed = true;
    //   },
    //   delay: (context) => {
    //     let delay = 0;
    //     if (
    //       context.type === "data" &&
    //       context.mode === "default" &&
    //       oneAnimation === false
    //     ) {
    //       delay = context.dataIndex * 300 + context.datasetIndex * 100;
    //     }
    //     return delay;
    //   },
    // },

    plugins: {
      tooltip: {
        bodyFont: {
          size: 15,
        },
        callbacks: {
          label: function (context) {
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
          align: "end",
          padding: {
            left: "20px",
          },
        },
      },
    },
  };

  const data = {
    labels: getLabelXChart(),
    datasets: [
      {
        label: "Portefeuille",
        data: getPositions(),
        borderColor: "rgb(22, 25, 60)",
        fill: "start",
        backgroundColor: (context, chartArea) => {
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

  return (
    <Line
      options={options}
      data={data}
      style={{ height: "400px", width: "100%", zIndex: "50" }}
    />
  );
}

export default LineChart;
