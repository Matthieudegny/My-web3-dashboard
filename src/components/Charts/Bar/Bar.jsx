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
  let tradeWonByMonth = [];
  let tradeLostByMonth = [];
  let tradeBEByMonth = [];
  let totalTradeByMonth = [];
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
    //initailize arrays with the numbers of month
    getMonth()?.map((month) => {
      tradeWonByMonth.push(0);
      tradeLostByMonth.push(0);
      tradeBEByMonth.push(0);
      totalTradeByMonth.push(0);
    });
    Orders?.map((order) => {
      //dynamize each index of each arrays
      getMonth()?.map((month, index) => {
        const date = new Date(order.date); // 2009-11-10
        const monthToCompare = date.toLocaleString("default", {
          month: "long",
        });
        if (monthToCompare === month) {
          totalTradeByMonth[index] += order.profit;
          if (order.profit < -500) {
            tradeLostByMonth[index] += order.profit;
          } else if (order.profit >= -500 && order.profit <= 500) {
            tradeBEByMonth[index] += order.profit;
          } else if (order.profit > 500) {
            tradeWonByMonth[index] += order.profit;
          }
        }
        console.log("tradeWon", tradeWonByMonth);
        console.log("tradeLost", tradeLostByMonth);
        console.log("tradeBE", tradeBEByMonth);
        let result = [tradeWonByMonth, tradeLostByMonth, tradeBEByMonth];
        return result;
      });
    });
  };

  getResultSortedParMonth();

  // console.log("tesssssst", getResultSortedParMonth());

  const data = {
    labels: getMonth(),
    datasets: [
      {
        label: "Total trades",
        data: totalTradeByMonth,
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 0",
      },
      {
        label: "Trades gagnés",
        data: tradeWonByMonth,
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
      {
        label: "Trades perdus",
        data: tradeLostByMonth,
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 2",
      },
      {
        label: "BE/en profit",
        data: tradeBEByMonth,
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 3",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ zIndex: "50" }} />;
}

export default BarChart;
