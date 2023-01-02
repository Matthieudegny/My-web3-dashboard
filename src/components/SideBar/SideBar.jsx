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
  const { mobileVersion, setToken } = useContext(DashBoardContext);

  const [FormVisibility, setFormVisibility] = useState(false);
  const [topAndBottomSideBarVisibility, settopAndBottomSideBarVisibility] =
    useState(false);

  const getColorButtonFaPowerOff = () => {
    if (FormVisibility) return "rgb(6, 181, 230)";
    else {
      return "rgb(13, 73, 158)";
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("user");
    token = JSON.parse(token);
    if (token) setToken(token.token);
  }, []);

  return (
    <div
      className="SideBar_container"
      onMouseEnter={() => settopAndBottomSideBarVisibility(true)}
      onMouseLeave={() => settopAndBottomSideBarVisibility(false)}
    >
      <div
        className={`SideBar_container_Login ${
          topAndBottomSideBarVisibility
            ? "topAndBottomSideBarVisibilityTrue"
            : "topAndBottomSideBarVisibilityFalse"
        }`}
      >
        <button
          className="SideBar_container_Login_buttonLogin"
          style={{ cursor: "pointer" }}
          onClick={() => setFormVisibility(!FormVisibility)}
        >
          <FaPowerOff
            style={{ cursor: "pointer", color: getColorButtonFaPowerOff() }}
            onClick={() => setFormVisibility(!FormVisibility)}
          />
        </button>
        <Login
          FormVisibility={FormVisibility}
          setFormVisibility={setFormVisibility}
        />
      </div>
      <div className="SideBar_container_Links_Container">
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            <NavLink
              to={page.link}
              end
              className={({ isActive }) => (isActive ? "activeLink" : "")}
            >
              {!mobileVersion ? (
                <div className="SideBar_container_Links_Container_Links_Item">
                  {page.name}
                  {page.icon}
                </div>
              ) : (
                <div className="SideBar_container_Links_Container_Links_Item">
                  {page.icon}
                </div>
              )}
            </NavLink>
          </React.Fragment>
        ))}
      </div>
      {/* <div
        className={`SideBar_developer ${
          topAndBottomSideBarVisibility
            ? "topAndBottomSideBarVisibilityTrue"
            : "topAndBottomSideBarVisibilityFalse"
        }`}
      >
        Matthieu Degny Développement
      </div> */}
    </div>
  );
};

export default SideBar;
