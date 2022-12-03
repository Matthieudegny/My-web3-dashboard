import React from "react";

//composants
import LineChart from "../../components/Charts/Lines/Line";
import Container from "../../components/Container/Container";

//data
import { titlesLignesArrayHome, numberLignesArayHome } from "../../data/data";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "1%",
      }}
    >
      <Container
        titlesLignes={titlesLignesArrayHome}
        numberLignes={numberLignesArayHome}
        graph={<LineChart />}
      />
    </div>
  );
};

export default Home;
