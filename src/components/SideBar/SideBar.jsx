import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

//import style
import "./SideBar.scss";

//icon
import { FaPowerOff } from "react-icons/fa";

//import context
import { DashBoardContext } from "../../Context/Context";

//import component
import Login from "../Login/Login";

//import data
import { pages } from "../../data/data";

const SideBar = () => {
  const { mobileVersion, setPage } = useContext(DashBoardContext);

  const [FormVisibility, setFormVisibility] = useState(false);

  const savePageForHeader = (page) => {
    setPage(page);
  };

  return (
    <div className="SideBar_container">
      <div className="SideBar_container_Login">
        <button
          className="SideBar_container_Login_buttonLogin"
          style={{ cursor: "pointer" }}
          onClick={() => setFormVisibility(!FormVisibility)}
        >
          <FaPowerOff
            style={{ cursor: "pointer" }}
            onClick={() => setFormVisibility(!FormVisibility)}
          />
        </button>
        <Login
          FormVisibility={FormVisibility}
          setFormVisibility={setFormVisibility}
        />
      </div>
      <div className="SideBar_Links_Container">
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            <NavLink
              to={page.link}
              end
              className={({ isActive }) => (isActive ? "activeLink" : "")}
              onClick={() => savePageForHeader(page.name)}
            >
              {!mobileVersion ? (
                <div className="SideBar_Links_Item">
                  {page.name}
                  {page.icon}
                </div>
              ) : (
                <div className="SideBar_Links_Item">{page.icon}</div>
              )}
            </NavLink>
          </React.Fragment>
        ))}
      </div>
      <div className="SideBar_developer">Matthieu Degny Développement</div>
    </div>
  );
};

export default SideBar;
