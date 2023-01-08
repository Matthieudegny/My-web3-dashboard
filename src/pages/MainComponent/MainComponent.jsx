import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./MainComponent.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

import Home from "../Home/Home";
import Charts from "../Charts/Charts";
import Orders from "../Orders/Orders";

const MainComponent = () => {
  const { page, message, setMessage, bckColor, setbckColor, showErrorMessage } =
    useContext(DashBoardContext);

  return (
    <div className="MainComponent-container">
      <div className="MainComponent-container-style"></div>
      <div
        style={{ backgroundColor: bckColor }}
        className={`errorMessage ${
          showErrorMessage ? "showErrorMessage" : "hideErrorMessage"
        }`}
      >
        {message}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default MainComponent;
