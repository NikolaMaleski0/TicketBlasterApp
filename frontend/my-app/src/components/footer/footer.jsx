import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import logo from '../logo/logo.png';
import './footer-style/footer.css';

export const Footer = () => {
  return(
    <div id="footer">
      <div className="footer-flex">
        <div className="footer-flex-left">
          <Link to="/"><img src={logo} alt="logo-footer" className="logo-footer" /></Link>
          <NavLink to="/musical-concerts" className="concerts">Musical Concerts</NavLink>
          <NavLink to="/stand-up-comedy" className="stand-up">Stand-up Comedy</NavLink>
        </div>
        <div className='copy-right'>
          <p className='copy-right-text'>Copyright TicketBlaster 2023 &copy;</p>
        </div>
      </div>
    </div>
  )
};