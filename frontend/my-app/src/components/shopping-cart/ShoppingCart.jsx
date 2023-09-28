import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import './cart-style/cart-style.css';
import axios from 'axios';

export const ShoppingCart = () => {
  const [addedTickets, setAddedTickets] = useState([]);
  const { userId } = useContext(AuthContext);  
  const [ticketId, setTicketId] = useState('');

  const currentTickets = async () => {
    try {
      const response = await axios.get(`/api/v1/ecommerce/get-tickets-user/${userId}`);
      setAddedTickets(response.data.data.ticket.tickets)
      // console.log(response);
      setTicketId(response.data.data.ticket._id);
      
      
    } catch(err) {  
      console.log(err);
    }
  };

  const removeEventFromCart = async (ticketId, eventToRemoveId) => {
    // console.log(ticketId);
    // console.log(eventToRemoveId);
    try {
      const response = await axios.delete(`api/v1/ecommerce/delete-event-from-cart/${ticketId}/${eventToRemoveId}`);
      console.log(response);
      window.location.reload();
    } catch(err) {
      console.log(err);
    }
  };

  const calculateTotalPrice = (ticket) => {
    const quantity = ticket.quantity;
    const price = ticket.event.price;
    const priceSplited = price.split('$');
    const priceNumber = Number(priceSplited[1]);
    return quantity * priceNumber;
  };

  useEffect(() => {
    currentTickets();
  }, []);

  return (
    <div id="shopping-cart">
      <h2 className="shopping-card-title">Shopping Cart</h2>
      {addedTickets.length === 0 ? (
        <p className="shopping-cart-empty">Shopping cart is empty.</p>
      ) : (
        <div className="cart-current-tickets">
        {addedTickets.map((ticket, i) =>{
          const totalPrice = calculateTotalPrice(ticket);
          // console.log(ticket);
          return (
            <div className="cart-current-tickets-flex" key={i}>
              <div className="cart-current-tickets-flex-left">
                <div className="cart-current-tickets-flex-left-inner">
                  <div className="cart-current-tickets-flex-left-inner-left">
                    <img src={`/images/${ticket.event.image}`} alt={ticket.name} className="cart-current-tickets-images" />
                  </div>
                  <div className="cart-current-tickets-flex-left-inner-right">
                    <h2 className="cart-current-tickets-title">{ticket.event.name}</h2>
                    <p className="cart-current-tickets-date">
                      {new Date(ticket.event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="cart-current-tickets-location">{ticket.event.location}</p>
                  </div>
                </div>
              </div>
              <div className="cart-current-tickets-flex-right">
                <p className="cart-current-tickets-total-price">${totalPrice.toFixed(2)} USD</p>
                <p className="cart-current-tickets-quantity">{ticket.quantity} x {ticket.event.price} USD</p>
                <button 
                  type="button"
                  className="cart-current-remove-ticket-button" 
                  onClick={() => removeEventFromCart(ticketId, ticket.event._id)}
                  >
                    Remove
                  </button>
              </div>
            </div>
          )
        })
        }
      </div>
      )}
      <div className="checkout-back-buttons-flex">
        <div className="back-button-container">
          <Link to='/' className="back-button">Back</Link>
        </div>
        {addedTickets.length > 0 && (
          <div className="checkout-button-container">
            <Link to='/checkout' className="checkout-button">Checkout</Link>
          </div>
        )}
      </div>
    </div>
  )
}