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

//Labels Charts
export const labelsLineEvolution = [
  "Total trades",
  "Balance compte",
  "Perf annuelle",
  "Trades gagnés",
  "Trades perdus",
  "BE/en profit",
];

export const labelsArrayChart2 = [
  "Total trades",
  "Moyenne trade/mois",
  "% trades gagnés",
  "% trades BE",
  "% trades perdus",
];

export const labelsArrayChart3 = [
  "% trades < -5000$",
  "% trades -5000/ -2500$",
  "% trades -2500/ -500$",
  "% trades -500/ -0$",
  "% trades 0/ 500$",
  "% trades 500/ 2500$",
  "% trades 2500/ 5000$",
  "% trades > 5000$",
];
