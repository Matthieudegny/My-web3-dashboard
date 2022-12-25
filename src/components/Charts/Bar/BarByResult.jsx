import React, { useContext, useEffect } from "react";

//import context
import { DashBoardContext } from "../../../Context/Context";

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

function BarChart() {
  const { Orders } = useContext(DashBoardContext);

  let tradesInfMinus5000 = 0;
  let tradesBetween5000And2500 = 0;
  let tradesBetween2500and500 = 0;
  let tradesBetween500and0 = 0;
  let tradesBetween0and500 = 0;
  let tradesBetween500and2500 = 0;
  let tradesBetween2500and5000 = 0;
  let tradesSup5000 = 0;

  let valuesTodisplay = [0, 0, 0, 0, 0, 0, 0, 0];

  const getTradesSortedByResult = () => {
    Orders?.map((order) => {
      if (order.profit < -5000) valuesTodisplay[0] += 1;
      if (order.profit > -5000 && order.profit < -2500) valuesTodisplay[1] += 1;
      if (order.profit > -2500 && order.profit < -500) valuesTodisplay[2] += 1;
      if (order.profit > -500 && order.profit < 0) valuesTodisplay[3] += 1;
      if (order.profit > 0 && order.profit < 500) valuesTodisplay[4] += 1;
      if (order.profit > 500 && order.profit < 2500) valuesTodisplay[5] += 1;
      if (order.profit > 2500 && order.profit < 5000) valuesTodisplay[6] += 1;
      if (order.profit > 5000) valuesTodisplay[7] += 1;
    });
  };

  getTradesSortedByResult();

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
        data: valuesTodisplay,
        backgroundColor: (context) => {
          if (context.dataIndex === 0) return "#550f87";
          if (context.dataIndex === 1) return "#550f87";
          if (context.dataIndex === 2) return "#550f87";
          if (context.dataIndex === 3) return "#0f3780";
          if (context.dataIndex === 4) return "#0f3780";
          if (context.dataIndex === 5) return "rgb(6, 181, 230)";
          if (context.dataIndex === 6) return "rgb(6, 181, 230)";
          if (context.dataIndex === 7) return "rgb(6, 181, 230)";
        },
        stack: "Stack 1",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ zIndex: "50" }} />;
}

export default BarChart;
