import React, { useContext } from "react";

import "./Header.scss";

//import context
import { DashBoardContext } from "../../Context/Context";

function Header() {
  const { page } = useContext(DashBoardContext);

  return (
    <div className="Header-container">
      <div className="Header-container-wrapper">
        <h2>
          {page}
          <div className="Header-container-wrapper-borderLine"></div>
        </h2>
      </div>
    </div>
  );
}

export default Header;
