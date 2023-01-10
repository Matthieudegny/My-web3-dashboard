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
import {
  GetDateFormatString,
  checkIfMonthhasToBeDisplayed,
} from "../../utils/utils";

const Orders = () => {
  const { Orders, setOrderToUpdate, balances, token, displayInfoMessage } =
    useContext(DashBoardContext);

  const [resetInputs, setResetInputs] = useState(false);
  const [date, setDate] = useState("");
  const [asset, setAsset] = useState("");
  const [direction, setDirection] = useState("");
  const [taille, setTaille] = useState(0);
  const [risk, setRisk] = useState(0);
  const [realise, setRealise] = useState("");
  const [profit, setProfit] = useState("");

  const onSuccessSaveOrder = (data) => {
    refetch();
    setResetInputs(true);
    displayInfoMessage(" Votre ordre a été ajouté", "rgb(6, 181, 230)");
  };

  const onSuccessDeleteOrder = (data) => {
    refetch();
    displayInfoMessage(" Vous ordre a été supprimé", "#550f87");
  };

  //for every success fetching, i refetch the datas Orders, to keep the component dynamic
  const { refetch } = useFetchOrders();

  const { mutate: addorderObject } = useSaveOrder(onSuccessSaveOrder);

  const { mutate: deleteorderObject } = useDeleteOrder(onSuccessDeleteOrder);

  const creationOrder = async () => {
    if (token === "") {
      displayInfoMessage(
        " Vous devez vous connecter avant de passer un ordre",
        "#550f87"
      );
    } else {
      if (
        date === "" ||
        asset === "" ||
        direction === "" ||
        taille === null ||
        risk === null ||
        realise === null ||
        profit === null
      ) {
        displayInfoMessage(" Vous devez remplir toutes les cases", "#550f87");
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

        const objectToReturn = [orderObject, token];
        addorderObject(objectToReturn);
      }
    }
  };

  const deleteOrder = async (order) => {
    const id = order._id;
    if (token !== "") {
      const objectToReturn = [id, token];
      deleteorderObject(objectToReturn);
    } else {
      displayInfoMessage(
        " Vous devez vous connecter avant de passer un ordre",
        "#550f87"
      );
    }
  };

  //after creationOrder reset all inputs
  useEffect(() => {
    if (resetInputs) {
      //reset
      setDate("");
      setAsset("");
      setDirection("");
      setTaille(0);
      setRisk(0);
      setRealise("");
      setProfit("");
      setResetInputs(false);
    }
  }, [resetInputs]);

  // with function from utils -> checkIfMonthhasToBeDisplayed()
  let monthsAlreadyToDisplay = [];

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
                <option value="" disabled hidden></option>
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
                  realise === "" ? "empty" : "checked"
                }`}
                name="realise"
                value={realise}
                onChange={(event) => setRealise(+event.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className={`Orders-profit ${
                  profit === "" ? "empty" : "checked"
                }`}
                name="profit"
                value={profit}
                onChange={(event) => setProfit(+event.target.value)}
              />
            </td>
            {/* Let empty here for the Balance column */}
            <td></td>
            <td>
              <button onClick={creationOrder} className="Orders-actions">
                Ajouter
              </button>
            </td>
          </tr>
          {Orders?.map((order, index) => {
            return (
              <React.Fragment key={index + order.date}>
                {checkIfMonthhasToBeDisplayed(
                  order.date,
                  monthsAlreadyToDisplay
                )[1] && (
                  <tr
                    style={{
                      borderBottom: "none",
                      height: "15px",
                    }}
                  >
                    <td
                      style={{ textAlign: "start", color: "rgb(6, 181, 230)" }}
                    >
                      {
                        checkIfMonthhasToBeDisplayed(
                          order.date,
                          monthsAlreadyToDisplay
                        )[0]
                      }
                      :
                    </td>
                  </tr>
                )}
                <tr style={{ borderBottom: "0.2px solid #3d3e3e" }}>
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
