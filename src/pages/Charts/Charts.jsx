import React, { useContext, useState } from "react";

//composants
import Container from "../../components/Container/Container";
import Chart1 from "../../components/Charts/Lines/Chart1";
import Chart2 from "../../components/Charts/Bar/Chart2";
import Chart3 from "../../components/Charts/Bar/Chart3";

//import context
import { DashBoardContext } from "../../Context/Context";

//import fonctions
import {
  getLabelsChart1,
  getDatasChart2,
  getDatasChart3,
} from "../../utils/utils";

//data
import { labelsArrayChart2, labelsArrayChart3 } from "../../data/data";

import "./Charts.scss";

const Charts = () => {
  const {
    Orders,
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    accountBalance,
    annualPerf,
    percBTC,
    percNSQ,
    percPF,
    monthlyPerf,
  } = useContext(DashBoardContext);

  //Chart n°1
  const datasChart1 = [percBTC, percNSQ, percPF];
  const labelsGraphChart1 = getLabelsChart1(percBTC, percNSQ, percPF)[2];
  const valuesChart1 = getLabelsChart1(percBTC, percNSQ, percPF)[1];
  const labelsArrayChart1 = getLabelsChart1(percBTC, percNSQ, percPF)[0];

  //Chart n°2
  const valuesChart2 = getDatasChart2(
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    numberOfTrades,
    Orders
  )[0];
  const labelsGraphChart2 = getDatasChart2(
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    numberOfTrades,
    Orders
  )[1];
  const datasChart2 = getDatasChart2(
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    numberOfTrades,
    Orders
  )[2];

  //Chart n°3
  const dataChart3 = getDatasChart3(Orders, numberOfTrades)[0];
  const valuesChart3 = getDatasChart3(Orders, numberOfTrades)[1];

  return (
    <div>
      <div style={{ marginTop: "139px" }}>
        <Container
          labels={labelsArrayChart1}
          values={valuesChart1}
          graph={<Chart1 datas={datasChart1} labels={labelsGraphChart1} />}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Container
          labels={labelsArrayChart2}
          values={valuesChart2}
          graph={<Chart2 datas={datasChart2} labels={labelsGraphChart2} />}
        />
      </div>
      <div style={{ marginTop: "20px", marginBottom: "110px" }}>
        <Container
          labels={labelsArrayChart3}
          values={valuesChart3}
          graph={<Chart3 datas={dataChart3} />}
        />
      </div>
    </div>
  );
};

export default Charts;
