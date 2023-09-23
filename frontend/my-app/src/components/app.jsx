import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { createAccount } from './createAccount/createAccount';
import { Navbar } from './navbar/navbar';
import { Events } from './events/events';
import { SearchEvents } from './search-events/SearchEvents';
import { Concerts } from './musical-concerts/Concerts';
import { StandUp } from './stand-up-comedy/StandUp';
import { Event } from './oneEvent/Event';
import { AdminUser } from './admin-user/AdminUser';
import { Forgot } from './forgotPassword/forgot';
import { Footer } from './footer/footer';
import { CreateEvent } from './outlet-components/outlet-create-event/CreateEvent';
import { OutletEvents } from './outlet-components/outlet-events/OutletEvents';
import { OutletUsers } from './outlet-components/outlet-users/OutletUsers';
import { OutletTicketsHistory } from './outlet-components/outlet-tickets-history/OutletTicketsHistory';
import { ShoppingCart } from './shopping-cart/ShoppingCart';
import { OutletUserDetails } from './outlet-components/outlet-user-details/OutletUserDetails';
import { AuthContext } from '../Context/AuthContext';


export const App = () => {
  const { isLoggedIn, userRole } = useContext(AuthContext);
  return (
    <div id='app'>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Events/>}></Route>
          <Route path='/events' element={<SearchEvents></SearchEvents>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/forgotPassword' element={<Forgot/>}></Route>
          <Route path='/createAccount' element={<CreateAccount/>}></Route>
          <Route path='/musical-concerts' element={<Concerts/>}></Route>
          <Route path='/stand-up-comedy' element={<StandUp/>}></Route>
          <Route path='/event/:id' element={<Event/>}></Route>
          <Route path='/user/' element={<AdminUser/>}>
            { userRole === 'admin' && isLoggedIn && ( 
            <>
              <Route path='create-event' element={<CreateEvent></CreateEvent>}></Route>
              <Route path='events' element={<OutletEvents/>}></Route>
              <Route path='users' element={<OutletUsers/>}></Route>
            </>
            )}
            <Route path='tickets-history' element={<OutletTicketsHistory/>}></Route>
            <Route path='user-details' element={<OutletUserDetails/>}></Route>
          </Route>
          <Route path='/shopping-cart' element={<ShoppingCart/>}></Route>
        </Routes>
      </div>
    </div>
  );
};