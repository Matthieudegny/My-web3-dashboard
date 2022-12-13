import React, { useContext, useState } from "react";

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

function BarChart() {
  let months = [];
  const {
    Orders,
    setOrders,
    setOrderToUpdate,
    message,
    setMessage,
    bckColor,
    setbckColor,
    balances,
  } = useContext(DashBoardContext);

  const getMonth = () => {
    Orders.map((order) => {
      const date = new Date(order.date); // 2009-11-10
      const month = date.toLocaleString("default", { month: "long" });
      if (!months.includes(month)) months.push(month);
    });
    return months;
  };

  //CONTINUER ICI
  const getResultSortedParMonth = () => {
    let tradeWon = [];
    let tradeLost = [];
    let tradeBE = [];
    getMonth()?.map((month) => {
      tradeWon.push(0);
      tradeLost.push(0);
      tradeBE.push(0);
    });
    Orders?.map((order) => {
      getMonth()?.map((month, index) => {
        const date = new Date(order.date); // 2009-11-10
        const monthToCompare = date.toLocaleString("default", {
          month: "long",
        });
        if (monthToCompare === month) {
          console.log("A suivre");
          //j'obtiens l'index du tableau ds le quel je dois changer la valeur
          //maintenant analyser le order.resultat pour savoir quel tableau je dois modifier
        }
      });
    });
  };

  getResultSortedParMonth();

  const data = {
    labels: getMonth(),
    datasets: [
      {
        label: "Total trades",
        data: [4, 5],
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 0",
      },
      {
        label: "Trades gagnés",
        data: [2, 2],
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
      {
        label: "Trades perdus",
        data: [0, 1],
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 2",
      },
      {
        label: "BE/en profit",
        data: [1, 2],
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 3",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ zIndex: "50" }} />;
}

export default BarChart;
