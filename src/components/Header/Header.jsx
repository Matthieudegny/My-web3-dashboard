import React, { useContext } from 'react'

import './Header.scss'

//import context
import { DashBoardContext } from "../../Context/Context";

function Header() {

  const { page } = useContext(DashBoardContext);

  return (
    <div className='Header-container'>
       <h2>{page}</h2>
    </div>
  )
}

export default Header