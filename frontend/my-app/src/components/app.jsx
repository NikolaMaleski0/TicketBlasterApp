import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { createAccount } from './createAccount/createAccount';
import { Navbar } from './navbar/navbar';
import { Events } from './events/events';
import { Forgot } from './forgotPassword/forgot';
import { Footer } from './footer/footer';

export const App = () => {
  return (
    <div id='app'>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Events/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/forgotPassword' element={<Forgot/>}></Route>
          <Route path='/createAccount' element={<CreateAccount/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};