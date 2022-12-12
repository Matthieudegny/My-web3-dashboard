import React, { useContext } from "react";

//composants
import LineChart from "../../components/Charts/Lines/Line";
import Container from "../../components/Container/Container";

//import context
import { DashBoardContext } from "../../Context/Context";

//data
import { titlesLignesArrayHome, numberLignesArayHome } from "../../data/data";

const Home = () => {
  const {
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    accountBalance,
    annualPerf,
  } = useContext(DashBoardContext);

  const numberLignesArayHome = [
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    accountBalance + "$",
    annualPerf,
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "1%",
      }}
    >
      <Container
        titlesLignes={titlesLignesArrayHome}
        numberLignes={numberLignesArayHome}
        graph={<LineChart />}
      />
    </div>
  );
};

export default Home;
