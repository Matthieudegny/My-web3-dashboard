import React, { useContext } from "react";

//composants
import LineChartEvolution from "../../components/Charts/Lines/LineEvolutions";
import Bar from "../../components/Charts/Bar/Bar";
import Container from "../../components/Container/Container";

//import context
import { DashBoardContext } from "../../Context/Context";

//data
import {
  titlesLignesArrayChartEvolution,
  titlesLignesArrayStatesTrades,
} from "../../data/data";

import "./Charts.scss";

const Charts = () => {
  const {
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    accountBalance,
    annualPerf,
    monthlyPerf,
  } = useContext(DashBoardContext);

  const numberLignesArayChartEvolution = [
    numberOfTrades,
    accountBalance + "$",
    annualPerf,
    monthlyPerf,
  ];

  const numberLignesArayStatesTrades = [
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
  ];

  return (
    <>
      <div>
        <Container
          titlesLignes={titlesLignesArrayChartEvolution}
          numberLignes={numberLignesArayChartEvolution}
          graph={<LineChartEvolution />}
        />
      </div>
      <div style={{ marginTop: "50px" }}>
        <Container
          titlesLignes={titlesLignesArrayStatesTrades}
          numberLignes={numberLignesArayStatesTrades}
          graph={<Bar />}
        />
      </div>
    </>
  );
};

export default Charts;
