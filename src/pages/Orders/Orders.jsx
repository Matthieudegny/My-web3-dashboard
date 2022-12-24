import React, { useContext, useState, useEffect } from "react";

//style
import "./Orders.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

import {
  useFetchOrders,
  useSaveOrder,
  useDeleteOrder,
} from "../../CustomHooks/useCustomeHook";
import { GetDateFormatString } from "../../utils/utils";

const Orders = () => {
  const {
    Orders,
    setOrderToUpdate,
    message,
    setMessage,
    bckColor,
    setbckColor,
    balances,
  } = useContext(DashBoardContext);

  const [resetInputs, setResetInputs] = useState(false);
  const [date, setDate] = useState("");
  const [asset, setAsset] = useState("");
  const [direction, setDirection] = useState("");
  const [taille, setTaille] = useState(0);
  const [risk, setRisk] = useState(0);
  const [realise, setRealise] = useState(0);
  const [profit, setProfit] = useState("");

  const onSuccessSaveOrder = (data) => {
    console.log("SaveOrder réussi", data);
    refetch();
    setResetInputs(true);
    setMessage("Votre ordre a été ajouté");
    setbckColor("rgb(6, 181, 230)");
  };

  const onSuccessDeleteOrder = (data) => {
    console.log("delete order resussi", data);
    refetch();
    setMessage(" Vous ordre a été supprimé");
    setbckColor("#550f87");
  };

  const { refetch } = useFetchOrders();

  const { mutate: addorderObject } = useSaveOrder(onSuccessSaveOrder);

  const { mutate: deleteorderObject } = useDeleteOrder(onSuccessDeleteOrder);

  const creationOrder = async () => {
    if (
      date === "" ||
      asset === "" ||
      direction === "" ||
      taille === null ||
      risk === null ||
      realise === null ||
      profit === null
    ) {
      setMessage(" Vous devez remplir toutes les cases");
      setbckColor("#550f87");
    } else {
      //back
      const orderObject = {
        date: date,
        asset: asset,
        direction: direction,
        taille: taille,
        risk: risk,
        realise: realise,
        profit: profit,
      };
      addorderObject(orderObject);
    }
  };

  const deleteOrder = async (order) => {
    const id = order._id;
    deleteorderObject(id);
  };

  //after 5 secondes (time of the animation) errorMessage is deleted
  useEffect(() => {
    if (message) {
      let deleteErrorMessage = setTimeout(() => {
        setMessage("");
        setbckColor("");
      }, 5000);
      return () => {
        clearTimeout(deleteErrorMessage);
      };
    }
  }, [message]);

  //after creationOrder reset all inputs
  useEffect(() => {
    if (resetInputs) {
      //reset
      setDate("");
      setAsset("");
      setDirection("");
      setTaille(0);
      setRisk(0);
      setRealise(0);
      setProfit("");
      setResetInputs(false);
    }
  }, [resetInputs]);

  return (
    <div className="Orders">
      <div
        style={{ backgroundColor: bckColor }}
        className={`styled-table-errorMessage ${
          message !== "" && bckColor !== "" ? "ErrorActive" : ""
        }`}
      >
        {message}
      </div>
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
                className={`Orders-date ${date === "" ? "empty" : "checked"}`}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className={`Orders-asset ${asset === "" ? "empty" : "checked"}`}
                name="asset"
                value={asset}
                onChange={(event) => setAsset(event.target.value)}
              />
            </td>
            <td>
              <select
                name="direction"
                className={`Orders-direction ${
                  direction === "" ? "empty" : "checked"
                }`}
                onChange={(event) => setDirection(event.target.value)}
                value={direction}
              >
                <option value=""></option>
                <option value="long">long</option>
                <option value="short">short</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                className={`Orders-taille ${
                  taille === 0 ? "empty" : "checked"
                }`}
                name="taille"
                value={taille}
                onChange={(event) => setTaille(+event.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className={`Orders-risk ${risk === 0 ? "empty" : "checked"}`}
                name="risk"
                value={risk}
                onChange={(event) => setRisk(+event.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className={`Orders-realise ${
                  realise === 0 ? "empty" : "checked"
                }`}
                name="realise"
                value={realise}
                onChange={(event) => setRealise(+event.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min=""
                max=""
                className={`Orders-profit ${
                  profit === "" || profit === 0 ? "empty" : "checked"
                }`}
                name="profit"
                value={profit}
                onChange={(event) => setProfit(+event.target.value)}
              />
            </td>
            <td>
              {/* <input
                type="number"
                className={`Orders-balance ${
                  balance === 0 ? "empty" : "checked"
                }`}
                name="balance"
                value={balance}
                onChange={(event) => setBalance(+event.target.value)}
              /> */}
            </td>
            <td>
              <button onClick={creationOrder} className="Orders-actions">
                Ajouter
              </button>
            </td>
          </tr>
          {Orders?.map((order, index) => {
            return (
              <React.Fragment key={index + order.date}>
                <tr>
                  <td>{GetDateFormatString(order.date)}</td>
                  <td>{order.asset}</td>
                  <td>{order.direction}</td>
                  <td>{order.taille}</td>
                  <td>{order.risk}</td>
                  <td>{order.realise}</td>
                  <td>{order.profit}</td>
                  <td>{balances[index]}</td>
                  <td className="container-button-actions">
                    <button
                      onClick={() => setOrderToUpdate(order)}
                      className="container-button-actions-update"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteOrder(order)}
                      className="container-button-actions-delete"
                    >
                      Supprimer
                    </button>
                  </td>
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
