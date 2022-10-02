import React from "react";

import "./Home.scss";

import LineChart from "../../components/Charts/Lines/Line";

const Home = () => {
  return (
    <section className="Home_container">
      <header className="Home_container-textPart">
        <div className="Home_container-textPart-Left">
          <h2>Performances du Portefeuille:</h2>
          <p>
            Annuelle: <span>+32%</span>{" "}
          </p>
          <p>
            Mensuelle: <span>+7%</span>{" "}
          </p>
        </div>
        <div className="Home_container-textPart-right">
          <h2>Résumé des ordres:</h2>
          <p>Total trades :12</p>
          <p>gagnant :12</p>
          <p>perant: 4</p>
        </div>
      </header>
      <main className="Home_container-chartPart">
        <LineChart />
      </main>
    </section>
  );
};

export default Home;
