import React from 'react';
import { Link } from 'react-router-dom';
import './create-account-style/create-account.css';

export const Createaccount = () => {
  return (
    <div id="createAccount">
      <h1 className="heading-create-acc">Create Account</h1>
      <div className="createAccount-width">
        <form action="" method="post" id="form">
          <label htmlFor="fullname" className='label-create label-create-style'>Full Name</label>
          <input type="text" name="fullname" id="fullname" className="input-create input-create-style" required />
          <label htmlFor="email" className="label-create label-create-style">Email</label>
          <input type="email" name="email" id="email" className='input-create input-create-style' required />
          <label htmlFor="password" className="label-create label-create-style">Password</label>
          <input type="password" name="password" id="password" className="input-create input-create-style" required />
          <label htmlFor="re-password" className="label-create label-create-style">Re-type password</label>
          <input type="password" name="re-password" id="re-password" className="input-create input-create-style" required />
          <button className="createAccount-btn">Create account</button>
        </form>
        <Link to="/login" className="already-have-btn">Already have an account?</Link>
      </div>
    </div>
  )
};