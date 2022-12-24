import React, { useContext, useState, useEffect } from "react";

//style
import "./PopUp.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

import {
  useFetchOrders,
  useUpdateOrder,
} from "../../CustomHooks/useCustomeHook";

function PopUp() {
  const { orderToUpdate, setMessage, setbckColor } =
    useContext(DashBoardContext);

  const [idOrder, setIdOrder] = useState(0);
  const [date, setDate] = useState("");
  const [asset, setAsset] = useState("");
  const [direction, setDirection] = useState("");
  const [taille, setTaille] = useState(0);
  const [risk, setRisk] = useState(0);
  const [realise, setRealise] = useState(0);
  const [profit, setProfit] = useState(0);

  const [openPopUp, setOpenPopUp] = useState(false);

  //i recover the value of the object orderToUpdate
  useEffect(() => {
    const { asset, date, direction, profit, realise, risk, taille, _id } =
      orderToUpdate;
    setIdOrder(_id);
    setDate(date);
    setAsset(asset);
    setDirection(direction);
    setTaille(taille);
    setRisk(risk);
    setRealise(realise);
    setProfit(profit);
    setOpenPopUp(true);
  }, [orderToUpdate]);

  const onSuccessUpdateOrder = (data) => {
    console.log("order update", data);
    setMessage(" Votre ordre a bien été modifié");
    setbckColor("rgb(13, 73, 158)");
    setOpenPopUp(false);
    refetch();
  };

  const { refetch } = useFetchOrders();

  const { mutate: updateOneOrder } = useUpdateOrder(onSuccessUpdateOrder);

  const updateOrder = async () => {
    const orderObject = {
      date: date,
      asset: asset,
      direction: direction,
      taille: taille,
      risk: risk,
      realise: realise,
      profit: profit,
    };
    if (
      orderObject.asset === orderToUpdate.asset &&
      orderObject.date === orderToUpdate.date &&
      orderObject.direction === orderToUpdate.direction &&
      orderObject.profit === orderToUpdate.profit &&
      orderObject.realise === orderToUpdate.realise &&
      orderObject.risk === orderToUpdate.risk &&
      orderObject.taille === orderToUpdate.taille
    ) {
      setMessage(" Vous n'avez rien modifié");
      setbckColor("rgb(13, 73, 158)");
      setOpenPopUp(false);
    } else {
      const objetIdANdOrder = [idOrder, orderObject];
      updateOneOrder(objetIdANdOrder);
      setOpenPopUp(false);
    }
  };

  return (
    <>
      {openPopUp && orderToUpdate !== "" && (
        <div className="PopUp-outside">
          <div className="PopUp-container">
            <h3>Order à modifier</h3>

            <div className="PopUp-container-Input-Globalcontainer">
              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Date:</label>
                <input
                  type="datetime-local"
                  name="date"
                  className="Orders-date PopUp-input"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Asset:</label>
                <input
                  type="text"
                  className="Orders-asset PopUp-input"
                  name="asset"
                  value={asset}
                  onChange={(event) => setAsset(event.target.value)}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Direction:</label>
                <select
                  name="direction"
                  className="Orders-direction PopUp-input"
                  onChange={(event) => setDirection(event.target.value)}
                  value={direction}
                >
                  <option value=""></option>
                  <option value="long">long</option>
                  <option value="short">short</option>
                </select>
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Taille:</label>
                <input
                  type="number"
                  className="Orders-taille PopUp-input"
                  name="taille"
                  value={taille}
                  onChange={(event) => setTaille(+event.target.value)}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Risk:</label>
                <input
                  type="number"
                  className="Orders-risk PopUp-input"
                  name="risk"
                  value={risk}
                  onChange={(event) => setRisk(+event.target.value)}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Realise:</label>
                <input
                  type="number"
                  className="Orders-realise PopUp-input"
                  name="realise"
                  value={realise}
                  onChange={(event) => setRealise(+event.target.value)}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Profit:</label>
                <input
                  type="number"
                  className="Orders-profit PopUp-input"
                  name="profit"
                  value={profit}
                  onChange={(event) => setProfit(+event.target.value)}
                />
              </div>

              <button
                onClick={updateOrder}
                className="Orders-actions PopUp-input"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopUp;
