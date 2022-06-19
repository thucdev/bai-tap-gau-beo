import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.scss"
const Navbar = () => {
   return (
      <div>
         <div className='topnav'>
            <a className='active' href='#home'>
               Home
            </a>
            <a href='login'>Login</a>
            <a href='campaign'>Campaign</a>
         </div>
      </div>
   )
}

export default Navbar
