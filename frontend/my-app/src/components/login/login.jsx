import React from 'react';
import { Link } from 'react-router-dom';
import './loginStyle/login.css'


export const Login = () => {

  return (
    <div id='login'>
      <h1 className='heading-log-in'>Log In</h1>
      <div className='login-width'>
        <form action="" method='post'>
          <label htmlFor="email" className="label-login login-label-style">Email</label>
          <input type="email" name="email" id="email" className="input-login login-input-style" required/>
          <label htmlFor="password" className="label-login login-label-style">Password</label>
          <input type="password" name="password" id="password" className="input-login login-input-style" required />
          <div className='flex-login'>
            <Link to='/' className='link-forgot'>Forgot Password?</Link>
            <button className='log-in-button'>Log in</button>
          </div>
          <Link to='/create-account' className='link-dont'>Don't have account?</Link>
        </form>
      </div>
    </div>
  )
};