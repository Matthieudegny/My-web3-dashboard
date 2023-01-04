import React, { useContext, useState } from "react";

//composants
import LineChartEvolution from "../../components/Charts/Lines/LineEvolutions";
import LineChart from "../../components/Charts/Lines/Line";
import BarByMonth from "../../components/Charts/Bar/BarByMonth";
import Container from "../../components/Container/Container";
import BarByResult from "../../components/Charts/Bar/BarByResult";

//import context
import { DashBoardContext } from "../../Context/Context";

//import fonctions
import { getDatasChart3, getDatasChart2 } from "../../utils/utils";

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
    Orders,
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    accountBalance,
    annualPerf,
    monthlyPerf,
  } = useContext(DashBoardContext);

  //graph n°1
  const valuesLineMarket = [annualPerf, accountBalance + "$"];

  //graph n°2
  const valuesBarByMonth = [numberOfTrades, averageTradesByMonth];
  getDatasChart2(
    valuesBarByMonth,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    numberOfTrades
  );

  //graph n°3
  const dataChart3 = getDatasChart3(Orders, numberOfTrades)[0];
  const valuesToDisplayChart3 = getDatasChart3(Orders, numberOfTrades)[1];

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
          numberLignes={valuesToDisplayChart3}
          graph={<BarByResult datas={dataChart3} />}
        />
      </div>
    </>
  );
};

export default Charts;
