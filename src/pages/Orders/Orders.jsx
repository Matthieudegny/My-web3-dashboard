import React, { useContext, useEffect, useState } from "react";

//style
import "./Orders.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

const Orders = () => {
  const submit = () => {
    console.log("validé");
  };

  const [date, setDate] = useState("");

  const { Orders } = useContext(DashBoardContext);

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

  useEffect(() => {
    getDateToday();
  }, []);

  return (
    <div className="Orders">
      <table class="styled-table">
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
                name="dateTrade"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className="Orders-date"
              />
            </td>
            <td>
              <input type="text" className="Orders-asset" />
            </td>
            <td>
              <select name="direction" id="" className="Orders-direction">
                <option value="long">long</option>
                <option value="short">short</option>
              </select>
            </td>
            <td>
              <input type="number" className="Orders-taille" />
            </td>
            <td>
              <input type="number" className="Orders-risk" />
            </td>
            <td>
              <input type="number" className="Orders-realise" />
            </td>
            <td>
              <input type="number" className="Orders-profit" />
            </td>
            <td>
              <input type="number" className="Orders-balance" />
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
