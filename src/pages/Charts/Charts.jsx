import React, { useContext, useEffect, useState } from "react";

//composants
import LineChartEvolution from "../../components/Charts/Lines/LineEvolutions";
import BarByMonth from "../../components/Charts/Bar/BarByMonth";
import Container from "../../components/Container/Container";
import BarByResult from "../../components/Charts/Bar/BarByResult";

//import context
import { DashBoardContext } from "../../Context/Context";

//data
import {
  labelsLineEvolution,
  labelsBarByMonths,
  labelsBarByResult,
} from "../../data/data";

import "./Charts.scss";

const Charts = () => {
  const [averageTradesByMonth, setAverageTradesByMonth] = useState(0);

  const {
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    accountBalance,
    annualPerf,
    monthlyPerf,
  } = useContext(DashBoardContext);

  const valuesLineEvolution = [
    numberOfTrades,
    accountBalance + "$",
    annualPerf,
    monthlyPerf,
  ];

  const valuesBarByMonth = [numberOfTrades, averageTradesByMonth];

  const valuesBarByResult = [];

  const getPercTradesTypes = () => {
    let percTradesWon = (numberOfTradesWon * 100) / numberOfTrades;
    valuesBarByResult.push(percTradesWon.toFixed(1));
    let percTradesBE = (numberOfTradesBE * 100) / numberOfTrades;
    valuesBarByResult.push(percTradesBE.toFixed(1));
    let percTradesLost = (numberOfTradesLost * 100) / numberOfTrades;
    valuesBarByResult.push(percTradesLost.toFixed(1));
  };

  getPercTradesTypes();

  return (
    <>
      <div>
        <Container
          titlesLignes={labelsLineEvolution}
          numberLignes={valuesLineEvolution}
          graph={<LineChartEvolution />}
        />
      </div>
      <div style={{ marginTop: "50px" }}>
        <Container
          titlesLignes={labelsBarByMonths}
          numberLignes={valuesBarByMonth}
          graph={
            <BarByMonth
              numberOfTrades={numberOfTrades}
              setAverageTradesByMonth={setAverageTradesByMonth}
            />
          }
        />
      </div>
      <div style={{ marginTop: "50px" }}>
        <Container
          titlesLignes={labelsBarByResult}
          numberLignes={valuesBarByResult}
          graph={<BarByResult />}
        />
      </div>
    </>
  );
};

export default Charts;
