import React from "react";
import { Link } from 'react-router-dom';
import './navbar-style/navbar.css';
import logo from '../logo/logo.png';

export const Navbar = () => {


  return (
    <div id="header">
      <div className="header-flex">
        <div className="left-side-flex">
            <ul>
              <li><Link to='/'><img src={logo} alt="logo" className="logo" /></Link></li>
              <li><Link to='/' className="style-hover">Musical Concerts</Link></li>
              <li><Link to='/'className="style-hover">Stand-up Comedy</Link></li>
            </ul>
        </div>
        <div className="right-side-flex">
          <ul>
            <input type="search" name="keyword" id="keyword" placeholder="Search.." className="search-bar" />
            <li><Link to='/login' className="log-in">Log in</Link></li>
            <li><Link to='/create-account' className="create-account">Create Account</Link></li>
            {/* <li><Link to='/'><i class="fa-solid fa-cart-shopping"></i></Link></li>
            <li><Link to='/'><i class="fa-solid fa-user"></i></Link></li> */}
          </ul>
        </div>
      </div>
    </div>
  )
};