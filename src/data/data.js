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

export const labelsLineEvolution = [
  "Total trades",
  "Balance compte",
  "Perf annuelle",
  "Perf mensuelle",
];

export const labelsBarByMonths = ["Total trades", "Moyenne trade/mois"];

export const labelsBarByResult = [
  "% trades gagnés",
  "% trades BE",
  "% trades perdus",
];
