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
  const [percBTC, setPercBTC] = useState([]);

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
    fetchBTCPrice();
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

  let pricesBTCPrep = [];
  let pricesBTC = [];
  let percentagesBTC = [];
  async function fetchBTCPrice() {
    const date = new Date();
    const timestampTodayInSeconds = Math.floor(date.getTime() / 1000);
    const json = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1641053503&to=${timestampTodayInSeconds}`
    );
    const result = await json.json();
    if (result) {
      result.prices?.map((price) => {
        //month at this price
        const dateObject = new Date(price[0]);
        const humanDateFormat = dateObject.toLocaleString();
        const month = humanDateFormat.slice(3, 5);

        if (pricesBTCPrep.length === 0) {
          pricesBTCPrep.push([price[1], humanDateFormat]);
        } else {
          if (pricesBTCPrep.length > 0) {
            //check if the month of price(result.map) is already in pricesBTC[]
            let monthAlreadyInpricesBTC = false;
            pricesBTCPrep.map((price) => {
              let valueToCompare = price[1].slice(3, 5);
              if (valueToCompare == month) monthAlreadyInpricesBTC = true;
            });
            if (!monthAlreadyInpricesBTC)
              pricesBTCPrep.push([price[1], humanDateFormat]);
          }
        }
      });
      console.log("pricesBTCPrep", pricesBTCPrep);
      // take the last 7 prices of the BTC
      if (pricesBTCPrep.length > 8) {
        let arrayCopy = JSON.parse(JSON.stringify(pricesBTCPrep));
        arrayCopy = arrayCopy.slice(-7);
        arrayCopy.map((result) => {
          result.splice(1, 1);
          let resultToSplit = result[0].toString();
          let resultToPush = resultToSplit.split(".");
          pricesBTC.push(resultToPush[0]);
        });
      }

      //transform price to %
      const tranformPricetoPerc = (x, y) => {
        console.log(x, y);
        let difference = y - x;
        let result = (difference * 100) / x;
        result = Math.round(result);
        percentagesBTC.push(result);
      };
      pricesBTC?.map((price, index) => {
        if (index === 0) return;
        tranformPricetoPerc(pricesBTC[index - 1], pricesBTC[index]);
      });
    }
    console.log("percentagesBTC", percentagesBTC);
    console.log("pricesBTCPrep", pricesBTCPrep);
    setPercBTC(percentagesBTC);
  }

  //NASDAQ PRICE
  //https://api.polygon.io/v2/aggs/ticker/NDAQ/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=lDmxp2Pbpp53MpXwSy8le5oowEPCKijm
  // https://polygon.io/docs/stocks/getting-started
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
        percBTC,
      }}
    >
      {props.children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardContextProvider;
