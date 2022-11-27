import React from "react";

import "./Home.scss";

import LineChart from "../../components/Charts/Lines/Line";

const Home = () => {
  const titlesLignesArrayHome = [
    "Total trades",
    "Trades gagnés",
    "Trades perdus",
    "BE/en profit",
    "Pertes rapides",
    "Balance compte",
    "Perf annuelle",
    "Perf mensuelle",
  ];

  const numberLignesArayHome = [
    "34",
    "14",
    "3",
    "8",
    "9",
    "25000$",
    "4200$/+10%",
    "400$/+3%",
  ];

  //titile and number = type string
  const displayLigneHome = (title, number) => {
    return (
      <div className="Home_container-sectionRight-array-item">
        <div className="Home_container-sectionRight-array-item-category">
          {title}
        </div>
        <div className="Home_container-sectionRight-array-item-value">
          {number}
        </div>
      </div>
    );
  };

  return (
    <div className="Home">
      {/* <h2>Performances du Portefeuille:</h2> */}
      <div className="Home_container">
        <section className="Home_container-sectionLeft">
          <LineChart />
        </section>

        <section className="Home_container-sectionRight">
          <div className="Home_container-sectionRight-array">
            {titlesLignesArrayHome?.map((ligne, index) => {
              return (
                <React.Fragment key={index}>
                  {displayLigneHome(
                    titlesLignesArrayHome[index],
                    numberLignesArayHome[index]
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
