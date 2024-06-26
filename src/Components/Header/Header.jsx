import React from 'react'
import { FiMenu } from "react-icons/fi";
import {AiFillCloseCircle}  from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { logOut } from '../../Redux/Slices/AuthSlice';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=> state?.auth?.isLoggedIn);
    const role = useSelector((state)=>state?.auth?.role);

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

    const handleLogOut = async (e)=>{
        e.preventDefault();
        const res = await dispatch(logOut());
        if (res?.payload?.success)
        navigate("/");

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
                    {isLoggedIn && role=="ADMIN" && (
                        <li>
                            <Link to="/dasboard">Dasboard</Link>
                        </li>
                    )}
                    {isLoggedIn && role=="ADMIN" && (
                        <li>
                            <Link to="/create/course">Create Course</Link>
                        </li>
                    )}
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/courses">All Courses</Link></li>

                    {!isLoggedIn &&(
                        <li className='absolute bottom-4'>
                            <div className='w-full flex item-center justify-center'>
                                <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                                    <Link to="/logIn">LogIn</Link>
                                </button>
                                <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
                                    <Link to="/signUp">SignUp</Link>
                                </button>
                            </div>
                        </li>
                    )}
                    {isLoggedIn &&(
                        <li className='absolute bottom-4'>
                            <div className='w-full flex item-center justify-center'>
                                <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                                    <Link to="/profile">Profile</Link>
                                </button>
                                <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
                                    <Link onClick={handleLogOut}>LogOut</Link>
                                </button>
                            </div>
                        </li>
                    )}
      
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header