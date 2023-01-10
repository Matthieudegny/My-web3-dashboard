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
  const { setToken } = useContext(DashBoardContext);

  const [FormVisibility, setFormVisibility] = useState(false);
  const [userPseudo, setuserPseudo] = useState("Compte Visiteur");
  const [LoginSideBarVisibility, setLoginSideBarVisibility] = useState(false);

  const getColorButtonFaPowerOff = () => {
    if (FormVisibility) return "rgb(6, 181, 230)";
    else {
      return "rgb(13, 73, 158)";
    }
  };

  //check if a token is available, if yes do the necessary
  useEffect(() => {
    let token = localStorage.getItem("user");
    token = JSON.parse(token);
    if (token) {
      setToken(token.token);
      token.user[1] !== null
        ? setuserPseudo(`Dashboard de ${token.user[1]}`)
        : setuserPseudo(`Dashboard utilisateur`);
    }
  }, []);

  return (
    <div
      className="SideBar_container"
      onMouseEnter={() => setLoginSideBarVisibility(true)}
      onMouseLeave={() => setLoginSideBarVisibility(false)}
    >
      <div
        className={`SideBar_container_Login ${
          LoginSideBarVisibility
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
          userPseudo={userPseudo}
          setuserPseudo={setuserPseudo}
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
              <div className="SideBar_container_Links_Container_Links_Item">
                {page.name}
                {page.icon}
              </div>
            </NavLink>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
