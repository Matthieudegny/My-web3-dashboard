import React from "react";
import { Routes, Route } from "react-router-dom";

import "./MainComponent.scss";

import Home from "../Home/Home";
import Charts from "../Charts/Charts";
import Orders from "../Orders/Orders";

const MainComponent = () => {
  return (
    <div className="MainComponent-container">
      <div class="animation-wrapper">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
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
