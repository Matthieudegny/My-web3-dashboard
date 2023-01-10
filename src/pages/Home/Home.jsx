import React, { useContext, useEffect } from "react";

//composants
import ChartSynthesis from "../../components/Charts/Lines/ChartSynthesis";
import Container from "../../components/Container/Container";

//import context
import { DashBoardContext } from "../../Context/Context";

//data
import { labelsChartSynthesis } from "../../data/data";

const Home = () => {
  const {
    numberOfTrades,
    numberOfTradesWon,
    numberOfTradesLost,
    numberOfTradesBE,
    accountBalance,
  } = useContext(DashBoardContext);

  const valuesChartSynthesis = [
    numberOfTrades,
    accountBalance + "$",
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
        //others pages have a marge on the right with the scroll-bar
        //scroll-bar = 0.5%
        width: "99.5%",
        marginRight: "0.5%",
      }}
    >
      <Container
        labels={labelsChartSynthesis}
        values={valuesChartSynthesis}
        graph={<ChartSynthesis />}
      />
    </div>
  );
};

export default Home;
