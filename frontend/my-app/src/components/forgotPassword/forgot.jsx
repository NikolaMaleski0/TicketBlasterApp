import React from 'react';
import { Link } from 'react-router-dom';
import './forgot-password-style/forgot-password.css';
 
export const Forgot = () => {
  return (
    <div id='forgot'>
      <h1 className="heading-forgot">Forgot Password</h1>
      <div className="forgot-width">
        <form action="" method="post">
          <label htmlFor="email" className="label-forgot label-forgot-style">Email</label>
          <input type="email" name="email" id="email" className="input-forgot input-forgot-style" />
          <button className="forgot-btn">Send password reset email</button>
        </form>
        <Link to='/login' className='link-forgot-btn'>Back to login</Link>
      </div>
    </div>
  )
};