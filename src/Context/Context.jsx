import { createContext, useState, useEffect } from "react";
import {
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
  const [message, setMessage] = useState("");
  const [bckColor, setbckColor] = useState("");
  const [Orders, setOrders] = useState([]);
  const [orderToUpdate, setOrderToUpdate] = useState("");

  const [numberOfTrades, setnumberOfTrades] = useState(0);
  const [numberOfTradesWon, setnumberOfTradesWon] = useState(0);
  const [numberOfTradesLost, setnumberOfTradesLost] = useState(0);
  const [numberOfTradesBE, setnumberOfTradesBE] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [balances, setbalances] = useState([]);
  const [percBTC, setPercBTC] = useState([]);
  const [percNSQ, setPercNSQ] = useState([]);
  const [percPF, setPercPF] = useState([]);
  const [token, setToken] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [triggerInfoMessage, setTriggerInfoMessage] = useState(false);

  const onSuccessOrdersRequest = (allOrders) => {
    setOrders(allOrders);
  };

  let pricesBTC = [];
  let percentagesBTC = [];
  const onSuccessBTCrequest = (pricesBtc) => {
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
    getPricesAndTransformToPerc(
      nasdaqPrices,
      nasdaqPerc,
      setPercNSQ,
      pricesNSQ
    );
  };

  //requests
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
    getBalance(Orders, setbalances, setAccountBalance, setPercPF);
  }, [Orders]);

  //after 2.5 secondes InfoMessage is deleted
  useEffect(() => {
    if (message) {
      setShowErrorMessage(true);
      let deleteInfosMessage = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2500);
      return () => {
        clearTimeout(deleteInfosMessage);
      };
    }
  }, [triggerInfoMessage]);

  const displayInfoMessage = (message, bckgColor) => {
    setTriggerInfoMessage(!triggerInfoMessage);
    setMessage(message);
    setbckColor(bckgColor);
  };

  return (
    <DashBoardContext.Provider
      value={{
        message,
        bckColor,
        Orders,
        setOrders,
        orderToUpdate,
        setOrderToUpdate,
        numberOfTrades,
        numberOfTradesWon,
        numberOfTradesLost,
        numberOfTradesBE,
        accountBalance,
        setAccountBalance,
        balances,
        setbalances,
        percBTC,
        percNSQ,
        percPF,
        token,
        setToken,
        showErrorMessage,
        setShowErrorMessage,
        triggerInfoMessage,
        setTriggerInfoMessage,
        displayInfoMessage,
      }}
    >
      {props.children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardContextProvider;
