import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import './navbar-style/navbar.css';
import logo from '../logo/logo.png';


export const Navbar = () => {
  const { isLoggedIn, updatedSearchQuery } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearchBarKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/events');
      updatedSearchQuery(query);
      setQuery('');
    }
  }
  return (
    <div id="header">
      <div className="header-flex">
        <div className="left-side-flex">
            <ul>
              <NavLink 
                  to='/' >
                    <img 
                      src={logo} 
                      alt="logo" 
                      className="logo" />
                </NavLink>
              <li>
                <NavLink 
                  to='/musical-concerts'
                  className="concerts"
                  >
                  Musical Concerts
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/stand-up-comedy'
                  className="stand-up"
              >Stand-up Comedy
              </NavLink>
              </li>
            </ul>
        </div>
        <div className="right-side-flex">
          <ul>
            <input 
              type="search" 
              name="keyword" 
              id="keyword" 
              placeholder="Search.." 
              className="search-bar"
              onKeyDown={handleSearchBarKeyDown}
              value={query}
              onChange={e => setQuery(e.target.value)}
             />
            {isLoggedIn ? (
              <>
                <li><Link to='/shopping-cart'><i className="fa-solid fa-cart-shopping fa-lg cart"></i></Link></li>
                <li><Link to='/user/user-details'><i className="fa-solid fa-user fa-lg user"></i></Link></li>
              </>
            ) : (
              <>
                <li><Link to='/login' className="log-in">Log in</Link></li>
                <li><Link to='/create-account' className="create-account">Create Account</Link></li>
              </>
            )}
          </ul>
        </div>

      </div>
    </div>
  )
};