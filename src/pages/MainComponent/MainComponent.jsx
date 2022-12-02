import React from "react";
import { Routes, Route } from "react-router-dom";

import "./MainComponent.scss";

import Home from "../Home/Home";
import Charts from "../Charts/Charts";
import Orders from "../Orders/Orders";

const MainComponent = () => {
  return (
    <div className="MainComponent-container">
      <div className="animation-wrapper">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={(<Home />)} /> */}
        <Route path="/charts" element={<Charts />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default MainComponent;
