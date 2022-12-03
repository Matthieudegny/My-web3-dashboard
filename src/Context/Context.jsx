import { createContext, useState, useEffect } from "react";

export const DashBoardContext = createContext();

const DashBoardContextProvider = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [mobileVersion, setMobileVersion] = useState(false);
  const [page, setPage] = useState("Home");
  const [Orders, setOrders] = useState([
    {
      id: 1,
      date: "03/12/2022 12h00",
      asset: "BTC",
      direction: "long",
      taille: "0.5",
      risk: "2%",
      realise: "6%",
      profit: "800$",
      balance: "26400$",
    },
    {
      id: 2,
      date: "03/12/2022 12h00",
      asset: "BTC",
      direction: "long",
      taille: "0.5",
      risk: "2%",
      realise: "6%",
      profit: "800$",
      balance: "26400$",
    },
    {
      id: 3,
      date: "03/12/2022 12h00",
      asset: "BTC",
      direction: "long",
      taille: "0.5",
      risk: "2%",
      realise: "6%",
      profit: "800$",
      balance: "26400$",
    },
  ]);

  const breakpoint = 800;

  //find the width of the window
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  //version mobile is true or not
  useEffect(() => {
    if (width > breakpoint) setMobileVersion(false);
    else setMobileVersion(true);
  }, [width]);

  return (
    <DashBoardContext.Provider value={{ mobileVersion, setPage, page, Orders }}>
      {props.children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardContextProvider;
