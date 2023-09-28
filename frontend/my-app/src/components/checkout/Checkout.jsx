import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import './checkout-style/checkout-style.css';
import axios from 'axios';

export const Checkout = () => {
  const [checkoutTickets, setCheckoutTickets] = useState([]);
  const { userId } = useContext(AuthContext);

  const checkOut = async () => {
    try {
      const response = await axios.get(`/api/v1/ecommerce/get-tickets-user/${userId}`);
      // console.log(response);
      setCheckoutTickets(response.data.data.ticket.tickets);
    } catch(err) {
      console.log(err);
    };
  };

  const payNow = async () => {
    try {
      const payload = {
        userId: userId
      }
      await axios.post(`/api/v1/ecommerce/process-payment/`, payload);
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
  }

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    checkoutTickets.forEach((checkoutTicket) => {
      const totalPrice = calculateTotalPrice(checkoutTicket);
      totalAmount += totalPrice;
    });
    return totalAmount;
  };

  const totalAmountForAllTickets = calculateTotalAmount();

  

  useEffect(() => {
    checkOut();
  }, [])

  return(
    <div id="checkout">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-flex-content-form">
        <div className="checkout-flex">
          {checkoutTickets && 
            checkoutTickets.map((checkoutTicket, i) => {
              const totalPrice = calculateTotalPrice(checkoutTicket);
              return(
                <div key={i} className="checkout-flex-left">
                  <div className="checkout-flex-left-content">
                    <div className="checkout-flex-left-inner">
                      <img src={`/images/${checkoutTicket.event.image}`} alt={checkoutTicket.event.name} className="checkout-image" />
                      <div className="checkout-flex-left-inner-right">
                        <h2 className="checkout-flex-ticket-title">{checkoutTicket.event.name}</h2>
                        <p className="checkout-flex-ticket-date">
                          {new Date(checkoutTicket.event.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                        </p>
                        <p className="checkout-flex-ticket-location">{checkoutTicket.event.location}</p>
                      </div>
                    </div>
                    <div className="checkout-flex-right-inner">
                      <p className="checkout-flex-total-price">${totalPrice.toFixed(2)} USD</p>
                      <div className="checkout-flex-tickets-quantity">{checkoutTicket.quantity} x  {checkoutTicket.event.price} USD</div>
                    </div>
                  </div>
                </div>
              )
            })
          }
         <div className="check-out-bottom-inner">
            <p className="checkout-total-bottom-price">Total:</p>
            <p className="checkout-total-bottom-total-price">${totalAmountForAllTickets.toFixed(2)} USD</p>
        </div>
        </div>
        <div className="checkout-flex-right">
            <form className="checkout-form">
              <div className="checkout-form-name">
                <label name="name">Full Name</label>
                <input type="text" name="name" id="name"/>
              </div>
              <div className="checkout-form-card">
                <label name="card">Card No.</label>
                <input type="text" name="card" id="card"/>
              </div>
              <div className="checkout-form-expires">
                <label name="expires">Expires</label>
                <input type="text" name="expires" id="expires"/>
              </div>
              <div className="checkout-form-pin">
                <label name="pin">Pin</label>
                <input type="text" name="pin" id="pin"/>
              </div>
            </form>
          </div>
      </div>
      <div className="checkout-buttons-flex">
        <div className="checkout-back-button-container">
          <Link to='/shopping-cart' className="checkout-back-button">Back</Link>
        </div>
        <div className="checkout-container">
            <Link to='/purchase-complete' className="checkout-pay-button" onClick={payNow}>Pay Now</Link>
        </div>
      </div>
    </div>
  )
}