import React, { useEffect } from "react";
//import dependecies
import { BrowserRouter } from "react-router-dom";

//import context
import DashBoardContext from "./Context/Context";

//import components
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import MainComponent from "./pages/MainComponent/MainComponent";
import PopUp from "./pages/PopUp/PopUp";

//import style
import "./App.scss";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <BrowserRouter>
        <DashBoardContext>
          <PopUp />
          <Header />

          <div className="App-main-container">
            <SideBar />
            <MainComponent />
          </div>
        </DashBoardContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
