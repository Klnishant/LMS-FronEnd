import React from 'react'
import Header from './Components/Header/Header'
import {Outlet} from "react-router-dom"
import Footer from './Components/Footer/Footer'

function LayOut() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default LayOut