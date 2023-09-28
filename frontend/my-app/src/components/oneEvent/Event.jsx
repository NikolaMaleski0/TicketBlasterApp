import React, { useState, useEffect, useContext }  from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import './one-event-style/one-event-style.css';
import logo from '../logo/logo-dark.png';

export const Event = () => {
  const [event, setEvent] = useState({});
  const [category, setCategory] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const { id } = useParams();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const getEvent = async () => {
    try {
      const response = await axios.get(`/api/v1/event/get-one-event/${id}`);
      setEvent(response.data.data.event);
      setCategory(response.data.data.event.category)
       console.log(response);
    } catch(err) {
      console.log(err);
    }
  };



  const addToCart = async () => {
    try {
      let quantityInput = document.getElementById('count');
      let quantity = quantityInput.value;
       console.log(quantity);

      if (!quantity || quantity <= 0) {
        quantity = 1;
        quantityInput.value = quantity
      }

      const response = await axios.post('/api/v1/ecommerce/add-ticket', {
        user: userId,
        tickets: [{ event: id, quantity }]
      });
      console.log(response);
      navigate('/shopping-cart');

    } catch (err) {
      console.log(err);
    }
  };

   console.log('related events:', event.relatedActs);

  useEffect(() => {
    if (id) {
      getEvent();
    }
  }, [id]);

  const addToCartPopUp = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowPopUp(true);
    } else {
      addToCart();
    };
  };




  return (
    <div id="event">
      <div className="event">
        <div className="event-header">
          <h2 className="heading-event">{event.name}</h2>
          <p className="date-event">
            {new Date(event.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })},
          </p>
          <p className="date-location">{event.location}</p>
        </div>
        <div className="event-content-flex">
          <div className="event-content-left">
            <img src={`/images/${event.image}`} alt={`${event.name}`} className="
            one-event-image" />
          </div>
          <div className="event-content-right">
            <div className="space-content">
              <p className="event-about">About</p>
              <p className="event-description">{event.eventDetails}</p>
            </div>
            <div className="event-tickets">
              <div className="tickets-align">
                <div className="tickets-flex-w-price">
                  <p className="tickets">Tickets</p>
                  <p className="tickets-price">{event.price}</p>
                </div>
                <div className="tickets-form">
                  <form method="post" id="form-quantity">
                    <input 
                      type="number"
                      name="quantity"
                      id="count" 
                      placeholder="1"
                     />
                    <button 
                      type="button" 
                      className="button-add" 
                      onClick={addToCartPopUp}
                      >
                      Add to cart
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {showPopUp && (
            <div className="popup">
              <div className="popup-buttons">
                <img src={logo} alt="logo" className="pop-up-logo" />
                <p className="pop-up-text">You are not logged in. Please log in or create an account to add items to your cart.</p>
                <button type="button" className="login-pop-up" onClick={() => navigate('/login')}>Log in</button>
                <button type="button" className="create-pop-up" onClick={() => navigate('/create-account')}>Create Account</button>
                <button type="button" className="pop-up-close" onClick={() => setShowPopUp(false)}><i className="fa-solid fa-x"></i></button>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
      <div className="related-acts">
        <div className="related">
          <h2 className="related-heading">Related Acts</h2>
        </div>
      </div>
      <div className="related-events-flex">
        {event.relatedActs &&
          event.relatedActs.map((relatedEvents, i) => {
             console.log('related events:', relatedEvents);
            return(
              <div key={i} className="related-acts-flex">
                <div className="relaed-acts-flex-left">
                  <img src={`/images/${relatedEvents.image}`} alt={relatedEvents.name} className="image-relatet-acs"/>
                  <div className="related-acts-inner-flext-right">
                    <h2 className="related-acts-tittle">{relatedEvents.name}</h2>
                    <h2 className="related-acts-date">{new Date(event.date)
                      .toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h2>
                    <p className="related-acts-about">{relatedEvents.eventDetails}</p>
                    <div className="related-acts-button-location-flex">
                      <p className="related-acts-location">{relatedEvents.location}</p>
                      <Link to={`/event/${relatedEvents._id}`} className="related-event-location-link">Get Tickets</Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};