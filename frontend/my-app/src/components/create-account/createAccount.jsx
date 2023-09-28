import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './create-account-style/create-account.css';
import axios from 'axios';
import validator from 'validator';
import logo from '../logo/logo-dark.png';

export const Createaccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reTypePassword, setReTypePassword] = useState('');
  const [emailExists, setEmailExists] = useState('');
  const [accountCreatedPopUp, setAccountCreatedPopUp] = useState(false);

  const nameSplit = name.split(' ');
  const nameAtLeastTwoWords = nameSplit.length >= 2;

  const validateEmail  = validator.isEmail(email) && email.toLowerCase() === email;

  const validatePassword = password.length > 8;
  // const validatePassword = validator.isStrongPassword(password, {
  //   minLength: 8,
  // });

  // console.log(password);
  // console.log(validatePassword);


  const signUp = async () => {
    if (!nameAtLeastTwoWords) {
      console.log('Full name must contain at least a name and a sirname');
      return
    }
    try {
      const response = await axios.post('/api/v1/auth/create-account', {
        name,
        email,
        password
      });

      if (response.status === 201) {
        setName('');
        setEmail('');
        setPassword('');
        setReTypePassword('')
        setAccountCreatedPopUp(true);
      }

    } catch(err) {
      console.log(err);
      if (err.response && err.response.status === 500) {
        setEmailExists('Email already exists in the database');
      };
    };
  };

  return (
    <div id="create-account">
      <h1 className="heading-create-acc">Create Account</h1>
      <div className="create-account-width">
        <form method="post" id="form-create-account">
          <label 
            htmlFor="name" 
            className='label-create label-create-style'>
              Full Name
          </label>
          <input 
            type="text"
            name="name" 
            id="name" 
            className="input-create input-create-style"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          { name !== '' && !nameAtLeastTwoWords && (
            <p className="checking-name-sign-up">Must contain at least a name and a sirname</p>
          )}
          <label 
          htmlFor="email" 
          className="label-create label-create-style">
            Email
          </label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className='input-create input-create-style' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          { email !== '' && !validateEmail && (
            <p className="checking-email-sign-up">Please provide a valid email</p>
          )}
          { emailExists && (
            <p className="checking-email-exist">Account already exists with that email address</p>
          )}
          <label 
          htmlFor="password" 
          className="label-create label-create-style">
            Password
          </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            className="input-create input-create-style" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          { password !== '' && !validatePassword && (
            <p className="validate-password-sign-up">Password must contain at least 8 characters</p>
          )}
          <label 
          htmlFor="re-password" 
          className="label-create label-create-style">
            Re-type password
          </label>
          <input 
            type="password"
            name="re-password" 
            id="re-password" 
            className="input-create input-create-style" 
            
            value={reTypePassword}
            onChange={(e) => setReTypePassword(e.target.value)}
            required 
          />
          {(reTypePassword !== '' && password !== reTypePassword) && (
            <p className="match-password-create-account">
              Passwords do not match
            </p>
          )}
          <button className="create-account-btn" type="button" onClick={signUp}>Create account</button>
        </form>
        { accountCreatedPopUp && (
          <div className="pop-up-create-account">
            <img src={logo} alt="logo" className="pop-up-logo-create-account" />
            <p className="pop-up-text-create-account">Succesfully created account! Proceed to log in.</p>
            <Link to="/login" className="proceed-to-log-in">Log in</Link>
            <button type="button" className="pop-up-close-create-account" onClick={() => setAccountCreatedPopUp(false)}><i className="fa-solid fa-x"></i></button>
          </div>
        )}
        <Link to="/login" className="already-have-btn">Already have an account?</Link>
      </div>
    </div>
  )
};