import React from "react";

//composants
import LineChartEvolution from "../../components/Charts/Lines/LineEvolutions";
import Bar from "../../components/Charts/Bar/Bar";
import Container from "../../components/Container/Container";

//data
import {
  titlesLignesArrayChartEvolution,
  numberLignesArayChartEvolution,
  titlesLignesArrayStatesTrades,
  numberLignesArayStatesTrades,
} from "../../data/data";

import "./Charts.scss";

const Charts = () => {
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
