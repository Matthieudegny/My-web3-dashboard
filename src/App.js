import React from "react";
//import dependecies
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";

//import context
import DashBoardContext from "./Context/Context";

//import components
import SideBar from "./components/SideBar/SideBar";
import MainComponent from "./pages/MainComponent/MainComponent";
import PopUp from "./pages/PopUp/PopUp";

//import style
import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DashBoardContext>
            <PopUp />
            <div className="App-main-container">
              <SideBar />
              <MainComponent />
            </div>
          </DashBoardContext>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
