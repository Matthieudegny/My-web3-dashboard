import React, { useContext, useState, useRef } from "react";

//style
import "./Orders.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

const Orders = () => {
  const { Orders, setOrders, setOrderToUpdate } = useContext(DashBoardContext);

  const assetInput = useRef();
  const directionInput = useRef();
  const tailleInput = useRef();
  const riskInput = useRef();
  const realiseInput = useRef();
  const profitInput = useRef();
  const balanceInput = useRef();

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
    setorderObject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //FAIRE LES VERIFS DES  INPUTS AVANT DE SUBMIT
  const submit = async () => {
    //back
    try {
      const saveOrder = await fetch("/api/dashboard", {
        method: "POST",
        body: JSON.stringify(orderObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await saveOrder.json();
      console.log(json);
      //front
      if (json) {
        let newArray = [...Orders];
        newArray.push(orderObject);
        setOrders(newArray);

        //reset
        assetInput.current.value = "";
        directionInput.current.value = "";
        tailleInput.current.value = "";
        riskInput.current.value = "";
        realiseInput.current.value = "";
        profitInput.current.value = "";
        balanceInput.current.value = "";

        setorderObject({
          date: "",
          asset: "",
          direction: "",
          taille: null,
          risk: null,
          realise: null,
          profit: null,
          balance: null,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteOrder = async (order) => {
    const id = order._id;
    //delete from back
    try {
      const orderToDelete = await fetch(`/api/dashboard/${order._id}`, {
        method: "DELETE",
      });
      const json = await orderToDelete.json();
      console.log(json);
      if (json) {
        //delete from front
        const newArray = Orders.filter((order) => order._id !== id);

        setOrders(newArray);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //POUR MODIFIER TOUVER UNE SOLUTION COTE FRONT CAR PROBLEME UX => OU SAISIR? POPUP
  const updateOrder = async (order) => {
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
    setOrderToUpdate(order);
  };

  //Input date -> get the value of the day
  const getDateToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    // const formattedToday = dd + '/' + mm + '/' + yyyy;
    // setDate(yyyy + "-" + mm + "-" + dd + "T" + "12:00");

    return yyyy + "-" + mm + "-" + dd + "T" + "12:00";

    // setorderObject((prevState) => ({
    //   ...prevState,
    //   date: date,
    // }));
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
                className="Orders-date"
                onChange={(e) => {
                  handleChange(e);
                  // setDate(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                className="Orders-asset"
                ref={assetInput}
                name="asset"
                onChange={handleChange}
              />
            </td>
            <td>
              <select
                name="direction"
                ref={directionInput}
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
                ref={tailleInput}
                className="Orders-taille"
                name="taille"
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                ref={riskInput}
                className="Orders-risk"
                name="risk"
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                ref={realiseInput}
                className="Orders-realise"
                name="realise"
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                ref={profitInput}
                className="Orders-profit"
                name="profit"
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                ref={balanceInput}
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
                  <td className="container-button-actions">
                    <button
                      onClick={() => updateOrder(order)}
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
