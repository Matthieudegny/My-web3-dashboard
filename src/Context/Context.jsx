import { createContext, useState, useEffect } from "react";

export const DashBoardContext = createContext();

const DashBoardContextProvider = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [mobileVersion, setMobileVersion] = useState(false);
  const [page, setPage] = useState("Home");
  const [Orders, setOrders] = useState([]);
  const [orderToUpdate, setOrderToUpdate] = useState("");

  //Get all orders
  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await fetch("/api/dashboard");
        const json = await orders.json();
        if (json) setOrders(json);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  //RESPONSIVE
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
    <DashBoardContext.Provider
      value={{
        mobileVersion,
        setPage,
        page,
        Orders,
        setOrders,
        orderToUpdate,
        setOrderToUpdate,
      }}
    >
      {props.children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardContextProvider;
