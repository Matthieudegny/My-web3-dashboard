import React from "react";

import LineChartEvolution from "../../components/Charts/Lines/LineEvolutions";

import "./Charts.scss";

const Charts = () => {
  return (
    <div className="Charts">
      <section className="Charts-chartEvolution">
        <LineChartEvolution />
      </section>
    </div>
  );
};

export default Charts;
