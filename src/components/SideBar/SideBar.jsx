import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

//import style
import "./SideBar.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

//import data
import { pages } from "../../data/data";

const SideBar = () => {
  const { mobileVersion,setPage } = useContext(DashBoardContext);

  const savePageForHeader = (page) => {
    setPage(page)
  }

  return (
    <div className="SideBar_container">
     
      <div className="SideBar_Links_Container">
        {pages.map((page) => (
          <NavLink
            to={page.link} end
            className={({ isActive }) =>
              isActive ? "activeLink" : ""
            }
            onClick={() => savePageForHeader(page.name)}
          >
            {!mobileVersion ? (
              <div className="SideBar_Links_Item">
                {page.name}
                {page.icon}
              </div>
            ) : (
              <div className="SideBar_Links_Item">
                {page.icon}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
