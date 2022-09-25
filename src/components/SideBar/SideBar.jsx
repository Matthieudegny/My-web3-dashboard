import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

//import style
import "./SideBar.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

//import data
import { pages } from "../../data/data";

const SideBar = () => {
  const { mobileVersion } = useContext(DashBoardContext);

  return (
    <div className="SideBar_container">
      {!mobileVersion && <h1>My dashboard</h1>}
      <div className="SideBar_Links_Container">
        {pages.map((page) => (
          <NavLink
            to={page.link} end
            className={({ isActive }) =>
              isActive ? "activeLink" : ""
            }
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
