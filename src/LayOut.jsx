import React from 'react'
import Header from './Components/Header/Header'
import {Outlet} from "react-router-dom"
import Footer from './Components/Footer/Footer'

function LayOut() {
  return (
    <>
        <div className='min-h-screen overflow-y-auto'>
        <Header />
        <Outlet />
        <Footer />
        </div>
    </>
  )
}

export default LayOut