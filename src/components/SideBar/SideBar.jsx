import React,{useState, useEffect, useContext} from 'react'
import { NavLink } from 'react-router-dom';

//import style
import './SideBar.scss'

//import icons
import { ImLibrary } from "react-icons/im";
import { AiOutlineAreaChart } from "react-icons/ai";
import { CgPlayListSearch } from "react-icons/cg";

//import context
import { DashBoardContext } from '../../Context/Context'

const SideBar = () => {

  const { mobileVersion } = useContext(DashBoardContext)

  const pages = [
    {name:"Home", link:"/",icon: <ImLibrary/>},
    {name:"Charts", link:"/charts", icon: <AiOutlineAreaChart/>},
    {name:"Orders", link:"/orders", icon: <CgPlayListSearch/>},
  ]

  return (

    <div className='SideBar_container'>

      {!mobileVersion &&
       <h1>My dashboard</h1>
      }

       {pages.map((page) => (

        <NavLink
          to={page.link}
          className={({ isActive }) => (isActive ? "activeLink" : "normalLink")}>
            
            {!mobileVersion ? (

              <>
                { page.name }
                { page.icon}
              </>

            ) : (
              
              <>
                { page.icon}
              </>
        
            )
            } 

        </NavLink>

       ))}

        
      

    </div>
  )
}

export default SideBar