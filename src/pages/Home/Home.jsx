import React, { useContext, useEffect } from "react";

//composants
import LineChartEvolution from "../../components/Charts/Lines/LineEvolutions";
import Container from "../../components/Container/Container";

//import context
import { DashBoardContext } from "../../Context/Context";

//data
import { labelsLineEvolution } from "../../data/data";

const Home = () => {
  const {
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    accountBalance,
    annualPerf,
  } = useContext(DashBoardContext);

  const valuesLineEvolution = [
    numberOfTrades,
    accountBalance + "$",
    annualPerf,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginLeft: "-1px",
      }}
    >
      <Container
        labels={labelsLineEvolution}
        values={valuesLineEvolution}
        graph={<LineChartEvolution />}
      />
    </div>
  );
};

export default Home;
