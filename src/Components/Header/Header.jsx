import React from 'react'
import { FiMenu } from "react-icons/fi";
import {AiFillCloseCircle}  from "react-icons/ai";
import { Link } from 'react-router-dom';

function Header() {

    const changeWidth = ()=> {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    const hideDrawer = ()=> {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }
  return (
    <>
        <div className='min-h[90vh]'>
            <div className="drawer absolute left-0 z-50 w-fit">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className='font-bold text-white m-4' 
                        />
                    </label>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">    
                    </label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content sm:w-80 relative">
                    <li className='w-fit absolute right-2 z-50'>
                        <button onClick={hideDrawer}>
                            <AiFillCloseCircle size={24} />
                        </button>
                    </li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About">About Us</Link></li>
                    <li><Link to="/Contact">Contact Us</Link></li>
                    <li><Link to="/Courses">All Courses</Link></li>
      
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header