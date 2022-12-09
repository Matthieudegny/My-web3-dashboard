import React, { useContext, useState, useRef } from "react";

//style
import "./PopUp.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

function PopUp() {
  const { orderToUpdate, setOrderToUpdate } = useContext(DashBoardContext);

  const [orderObject, setOrderObject] = useState({
    asset: "m",
    date: "m",
    direction: "m",
    taille: "m",
    risk: "m",
    realise: "m",
    profit: "m",
    balance: "m",
  });

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
    }
    if (name === "date") {
      //changer ici et mettre le meme type de date
      let day = value.slice(8, 10);
      let month = value.slice(5, 7);
      let year = value.slice(0, 4);
      let hour = value.slice(11, 16);
      value = `${day}/${month}/${year} ${hour} `;
      console.log("day", value);
    }
    setOrderToUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async () => {
    // const id = order._id;
    // //update from back
    // try {
    //   const orderToUpdate = await fetch(`/api/dashboard/${order._id}`, {
    //     method: "PATCH",
    //     body: JSON.stringify(orderObject),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const json = await orderToUpdate.json();
    //   console.log(json);
    //   if (json) {
    //     //update from front
    //     const newArray = [...Orders];
    //     const indexOrderToUpdate = Orders.findIndex(
    //       (element) => element._id === id
    //     );
    //     newArray.splice(indexOrderToUpdate, 1, orderObject);
    //     setOrders(newArray);
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  console.log(orderToUpdate);

  return (
    <>
      {orderToUpdate.asset !== "" && (
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
                  onChange={(e) => {
                    handleChange(e);
                    // setDate(e.target.value);
                  }}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Asset:</label>
                <input
                  type="text"
                  className="Orders-asset PopUp-input"
                  name="asset"
                  value={orderToUpdate.asset}
                  onChange={handleChange}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Direction:</label>
                <select
                  name="direction"
                  className="Orders-direction PopUp-input"
                  onChange={handleChange}
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
                  value={orderToUpdate.taille}
                  className="Orders-taille PopUp-input"
                  name="taille"
                  onChange={handleChange}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Risk:</label>
                <input
                  type="number"
                  value={orderToUpdate.risk}
                  className="Orders-risk PopUp-input"
                  name="risk"
                  onChange={handleChange}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Realise:</label>
                <input
                  type="number"
                  value={orderToUpdate.realise}
                  className="Orders-realise PopUp-input"
                  name="realise"
                  onChange={handleChange}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Profit:</label>
                <input
                  type="number"
                  value={orderToUpdate.profit}
                  className="Orders-profit PopUp-input"
                  name="profit"
                  onChange={handleChange}
                />
              </div>

              <div className="PopUp-container-Input-Globalcontainer-containerInputLabel">
                <label> Balance:</label>
                <input
                  type="number"
                  value={orderToUpdate.balance}
                  className="Orders-balance PopUp-input"
                  name="balance"
                  onChange={handleChange}
                />
              </div>

              <button onClick={submit} className="Orders-actions PopUp-input">
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
