import React, { useContext, useState, useEffect } from "react";

import "./Header.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

//icon
import { FaPowerOff } from "react-icons/fa";

function Header() {
  const { page, message, setMessage, bckColor, setbckColor } =
    useContext(DashBoardContext);

  const [date, setDate] = useState();

  const getDateToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    // const formattedToday = dd + '/' + mm + '/' + yyyy;
    setDate(dd + "/" + mm + "/" + yyyy);
  };

  useEffect(() => {
    getDateToday();
  }, []);

  return (
    <header className="Header">
      <div className="Header-container">
        <div className="Header-container-user">
          Bienvenue, Matthieu
          <FaPowerOff />
        </div>
        <div className="Header-container-Page">
          <div className="Header-container-Page-wrapper">
            <h2>
              {page}
              <div className="Header-container-Page-wrapper-borderLine"></div>
            </h2>
          </div>
        </div>

        <div className="Header-container-slider">
          <div className="Header-container-text1 item">
            ...NSQ +3%...BTC +6%...Portefeuille +4%...
          </div>
          <div className="Header-container-text2 item">
            ...NSQ +3%...BTC +6%...Portefeuille +4%...
          </div>
        </div>
        <div
          style={{ backgroundColor: bckColor }}
          className={`errorMessage ${
            message !== "" && bckColor !== "" ? "ErrorActive" : ""
          }`}
        >
          {message}
        </div>
      </div>
      <div className="Header-date">{date}</div>
    </header>
  );
}

export default Header;
