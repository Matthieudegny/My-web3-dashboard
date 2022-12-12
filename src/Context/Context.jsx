import { createContext, useState, useEffect } from "react";

export const DashBoardContext = createContext();

const DashBoardContextProvider = (props) => {
  const [page, setPage] = useState("Home");
  const [message, setMessage] = useState("");
  const [bckColor, setbckColor] = useState("");
  const [Orders, setOrders] = useState([]);
  const [orderToUpdate, setOrderToUpdate] = useState("");

  const [numberOfTrades, setnumberOfTrades] = useState(0);
  const [numberOfTradesWon, setnumberOfTradesWon] = useState(0);
  const [numberOfTradesLost, setnumberOfTradesLost] = useState(0);
  const [numberOfTradesBE, setnumberOfTradesBE] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [annualPerf, setannualPerf] = useState(0);
  const [monthlyPerf, setMonthlyPerf] = useState(0);
  const [balances, setbalances] = useState([]);

  const perf2021 = 10;

  //Get all orders
  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await fetch("/api/dashboard");
        const json = await orders.json();
        if (json) {
          setOrders(json);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  useEffect(() => {
    setnumberOfTrades(Orders.length);
    sortTradeWonOrLostOrBE();
    getAnnualPerf(perf2021);
    getMonthlyPerf();
    getBalance();
  }, [Orders]);

  let balancesArray = [];
  function getBalance() {
    const ordersReversed = [...Orders].reverse();
    ordersReversed.map((order, index) => {
      if (balancesArray.length === 0) balancesArray.push(order.profit);
      else {
        let lastBalance = balancesArray[index - 1] + order.profit;
        balancesArray.push(lastBalance);
      }
    });
    setbalances(balancesArray.reverse());
    setAccountBalance(balancesArray[0]);
  }

  function sortTradeWonOrLostOrBE() {
    let totalTradesWon = 0;
    let totalTradesLost = 0;
    let totalTradesBE = 0;
    Orders.map((order) => {
      if (order.profit < -500) {
        totalTradesLost++;
      } else if (order.profit >= -500 && order.profit <= 500) {
        totalTradesBE++;
      } else if (order.profit > 500) {
        totalTradesWon++;
      }
    });

    setnumberOfTradesWon(totalTradesWon);
    setnumberOfTradesLost(totalTradesLost);
    setnumberOfTradesBE(totalTradesBE);
  }

  function getAnnualPerf(lastYear) {
    let perfThisYear = accountBalance - lastYear;
    let perfThisYearPercent = (perfThisYear * 100) / lastYear;
    setannualPerf(`${perfThisYear}$/${perfThisYearPercent}%`);
  }

  function getMonthlyPerf() {
    let month = new Date();
    month = month.getMonth() + 1;
    let monthlyPerf = 0;
    Orders?.map((order) => {
      if (order.date.slice(5, 7) == month.toString())
        monthlyPerf += order.profit;
    });
    setMonthlyPerf(`${monthlyPerf}$`);
  }

  return (
    <DashBoardContext.Provider
      value={{
        setPage,
        page,
        Orders,
        setOrders,
        orderToUpdate,
        setOrderToUpdate,
        message,
        setMessage,
        bckColor,
        setbckColor,
        numberOfTrades,
        numberOfTradesWon,
        numberOfTradesLost,
        numberOfTradesBE,
        accountBalance,
        annualPerf,
        monthlyPerf,
        setAccountBalance,
        balances,
        setbalances,
      }}
    >
      {props.children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardContextProvider;
