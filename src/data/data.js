//import icons
import { ImLibrary } from "react-icons/im";
import { AiOutlineAreaChart } from "react-icons/ai";
import { CgPlayListSearch } from "react-icons/cg";

//page -> links for sideBar
export const pages = [
  { name: "Home", link: "/", icon: <ImLibrary /> },
  { name: "Charts", link: "/charts", icon: <AiOutlineAreaChart /> },
  { name: "Orders", link: "/orders", icon: <CgPlayListSearch /> },
];

export const titlesLignesArrayHome = [
  "Total trades",
  "Trades gagnés",
  "Trades perdus",
  "BE/en profit",
  "Balance compte",
  "Perf annuelle",
  // "Perf mensuelle",
];

export const numberLignesArayHome = [
  "34",
  "14",
  "3",
  "8",
  "9",
  "25000$",
  "4200$/+10%",
  "400$/+3%",
];

export const titlesLignesArrayChartEvolution = [
  "Total trades",
  "Balance compte",
  "Perf annuelle",
  "Perf mensuelle",
];

export const numberLignesArayChartEvolution = [
  "34",
  "25000$",
  "4200$/+10%",
  "400$/+3%",
];

export const titlesLignesArrayStatesTrades = [
  "Total trades",
  "Trades gagnés",
  "Trades perdus",
  "BE/en profit",
];

export const numberLignesArayStatesTrades = ["34", "14", "3", "8", "9"];
