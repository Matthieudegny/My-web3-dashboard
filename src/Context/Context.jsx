import { createContext, useState, useEffect } from "react";
import {
  getMonthlyPerf,
  getPricesAndTransformToPerc,
  sortTradeWonOrLostOrBE,
  getBalance,
} from "../utils/utils";
import {
  useFetchOrders,
  useFetchBTCPrices,
  useFetchNSQPrices,
} from "../CustomHooks/useCustomeHook";

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
  const [percNSQ, setPercNSQ] = useState([]);

  const onSuccessOrdersRequest = (allOrders) => {
    console.log("succes", allOrders);
    setOrders(allOrders);
  };

  let pricesBTC = [];
  let percentagesBTC = [];
  const onSuccessBTCrequest = (pricesBtc) => {
    console.log("btcprices reussi", pricesBtc);
    getPricesAndTransformToPerc(
      pricesBTC,
      percentagesBTC,
      setPercBTC,
      pricesBtc
    );
  };

  let nasdaqPrices = [];
  let nasdaqPerc = [];
  const onSuccessNSQrequest = (pricesNSQ) => {
    console.log("NSQprices reussi", pricesNSQ);
    getPricesAndTransformToPerc(
      nasdaqPrices,
      nasdaqPerc,
      setPercNSQ,
      pricesNSQ
    );
  };

  const { allOrders } = useFetchOrders(onSuccessOrdersRequest);
  const { pricesBtc } = useFetchBTCPrices(onSuccessBTCrequest);
  const { pricesNSQ } = useFetchNSQPrices(onSuccessNSQrequest);

  //synchronization at every changes for Orders
  useEffect(() => {
    setnumberOfTrades(Orders.length);
    sortTradeWonOrLostOrBE(
      Orders,
      setnumberOfTradesWon,
      setnumberOfTradesLost,
      setnumberOfTradesBE
    );
    getMonthlyPerf(Orders, setMonthlyPerf);
    getBalance(Orders, setbalances, setAccountBalance, setannualPerf);
  }, [Orders]);

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
        percNSQ,
      }}
    >
      {props.children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardContextProvider;
