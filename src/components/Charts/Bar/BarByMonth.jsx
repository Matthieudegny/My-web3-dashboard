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

function BarChart({ numberOfTrades, setAverageTradesByMonth }) {
  let months = [];
  let tradeWonByMonth = [];
  let tradeLostByMonth = [];
  let tradeBEByMonth = [];
  const { Orders } = useContext(DashBoardContext);

  const createArrayMonths = () => {
    let arrayMonths = [];
    Orders.map((order) => {
      const date = new Date(order.date);
      const month = date.toLocaleString("default", { month: "long" });
      if (!arrayMonths.includes(month)) arrayMonths.push(month);
    });
    months = arrayMonths.reverse();
  };
  createArrayMonths();

  const getAverageTradesByMonth = () => {
    let result = numberOfTrades / months.length;
    setAverageTradesByMonth(result.toFixed(1));
  };

  useEffect(() => {
    if (numberOfTrades > 0) getAverageTradesByMonth();
  }, [months]);

  const getResultSortedParMonth = () => {
    //initailize arrays with the numbers of month
    months?.map((month) => {
      tradeWonByMonth.push(0);
      tradeLostByMonth.push(0);
      tradeBEByMonth.push(0);
    });
    Orders?.map((order) => {
      //dynamize each index of each arrays
      months?.map((month, index) => {
        const date = new Date(order.date);
        const monthToCompare = date.toLocaleString("default", {
          month: "long",
        });
        if (monthToCompare === month) {
          if (order.profit < -500) {
            tradeLostByMonth[index] += order.profit;
          } else if (order.profit >= -500 && order.profit <= 500) {
            tradeBEByMonth[index] += order.profit;
          } else if (order.profit > 500) {
            tradeWonByMonth[index] += order.profit;
          }
        }
      });
    });
  };

  getResultSortedParMonth();

  const data = {
    labels: months,
    datasets: [
      {
        label: "Trades gagnés",
        data: tradeWonByMonth,
        backgroundColor: "rgb(6, 181, 230)",
        stack: "Stack 1",
      },
      {
        label: "Trades perdus",
        data: tradeLostByMonth,
        backgroundColor: "#550f87",
        stack: "Stack 2",
      },
      {
        label: "BE/en profit",
        data: tradeBEByMonth,
        backgroundColor: "#0f3780",
        stack: "Stack 3",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ zIndex: "50" }} />;
}

export default BarChart;
