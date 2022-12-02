import React from "react";

import LineChartEvolution from "../../components/Charts/Lines/LineEvolutions";
import Bar from "../../components/Charts/Bar/Bar";
import LineChart from "../../components/Charts/Lines/Line";

import "./Charts.scss";
import "../../pages/Home/Home.scss";

const Charts = () => {
  const titlesLignesArrayChartEvolution = [
    "Total trades",
    "Balance compte",
    "Perf annuelle",
    "Perf mensuelle",
  ];

  const numberLignesArayChartEvolution = [
    "34",
    "25000$",
    "4200$/+10%",
    "400$/+3%",
  ];

  //titile and number = type string
  const displayLigneHome = (title, number) => {
    return (
      <div className="chartEvolution-container-sectionRight-array-item">
        <div className="chartEvolution-container-sectionRight-array-item-category">
          {title}
        </div>
        <div className="chartEvolution-container-sectionRight-array-item-value">
          {number}
        </div>
      </div>
    );
  };

  return (
    <div className="Charts">
      <div className="chartEvolution-container">
        <section className="chartEvolution-container-sectionLeft">
          <LineChartEvolution />
        </section>

        <section className="chartEvolution-container-sectionRight">
          <div className="chartEvolution-container-sectionRight-array">
            {titlesLignesArrayChartEvolution?.map((ligne, index) => {
              return (
                <React.Fragment key={index}>
                  {displayLigneHome(
                    titlesLignesArrayChartEvolution[index],
                    numberLignesArayChartEvolution[index]
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </div>

      <section className="Charts-Bar">
        <Bar />
      </section>
    </div>
  );
};

export default Charts;
