import React, { useContext, useEffect, useState } from "react";

//style
import "./Orders.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

const Orders = () => {
  const { Orders } = useContext(DashBoardContext);

  const [asset, setasset] = useState("ADA");
  const [direction, setdirection] = useState("long");
  const [taille, settaille] = useState(1);
  const [risk, setrisk] = useState(2);
  const [realise, setrealise] = useState(3);
  const [profit, setprofit] = useState(500);
  const [balance, setbalance] = useState(45000);

  const [orderObject, setorderObject] = useState({
    date: "",
    asset: "",
    direction: "",
    taille: null,
    risk: null,
    realise: null,
    profit: null,
    balance: null,
  });

  useEffect(() => {
    console.log(orderObject);
  }, [orderObject]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (
      name === "taille" ||
      name === "risk" ||
      name === "realise" ||
      name === "profit" ||
      name === "balance"
    ) {
      value = +value;
      console.log(value);
    }
    setorderObject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async () => {
    const orderToCreate = {
      date,
      asset,
      direction,
      taille,
      risk,
      realise,
      profit,
      balance,
    };
    console.log("orderTocreata", orderToCreate);
    console.log("orderObject", orderObject);
    const saveOrder = await fetch("/api/dashboard", {
      method: "POST",
      body: JSON.stringify(orderToCreate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await saveOrder.json();
    console.log(json);
  };

  //Input date -> get the value of the day
  const [date, setDate] = useState("12/02/20");
  const getDateToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    // const formattedToday = dd + '/' + mm + '/' + yyyy;
    setDate(yyyy + "-" + mm + "-" + dd + "T" + "12:00");
  };
  // useEffect(() => {
  //   getDateToday();
  // }, []);

  return (
    <div className="Orders">
      <table className="styled-table">
        <thead>
          <tr>
            <th className="Orders-date">Date</th>
            <th className="Orders-asset">Asset</th>
            <th className="Orders-direction">Direction</th>
            <th className="Orders-taille">Taille position</th>
            <th className="Orders-risk">Risk %</th>
            <th className="Orders-realise">Realisé %</th>
            <th className="Orders-profit">Profit</th>
            <th className="Orders-balance">Balance</th>
            <th className="Orders-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="datetime-local"
                name="date"
                value={date}
                className="Orders-date"
                onChange={(e) => {
                  handleChange(e);
                  setDate(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                className="Orders-asset"
                name="asset"
                onChange={handleChange}
              />
            </td>
            <td>
              <select
                name="direction"
                className="Orders-direction"
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="long">long</option>
                <option value="short">short</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                className="Orders-taille"
                name="taille"
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                className="Orders-risk"
                name="risk"
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                className="Orders-realise"
                name="realise"
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                className="Orders-profit"
                name="profit"
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                className="Orders-balance"
                name="balance"
                onChange={handleChange}
              />
            </td>
            <td>
              <button onClick={submit} className="Orders-actions">
                Add
              </button>
            </td>
          </tr>
          {Orders?.map((order) => {
            return (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.date}</td>
                  <td>{order.asset}</td>
                  <td>{order.direction}</td>
                  <td>{order.taille}</td>
                  <td>{order.risk}</td>
                  <td>{order.realise}</td>
                  <td>{order.profit}</td>
                  <td>{order.balance}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
