import React, { useContext, useState } from "react";

//composants
import LineChartEvolution from "../../components/Charts/Lines/LineEvolutions";
import LineChart from "../../components/Charts/Lines/Line";
import BarByMonth from "../../components/Charts/Bar/BarByMonth";
import Container from "../../components/Container/Container";
import BarByResult from "../../components/Charts/Bar/BarByResult";

//import context
import { DashBoardContext } from "../../Context/Context";

//data
import {
  labelsBarByMonths,
  labelsBarByResult,
  labelsLineMarket,
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

  const valuesLineMarket = [annualPerf, accountBalance + "$"];

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
      <div style={{ marginTop: "139px" }}>
        <Container
          titlesLignes={labelsLineMarket}
          numberLignes={valuesLineMarket}
          graph={<LineChart />}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
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
      <div style={{ marginTop: "20px" }}>
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
