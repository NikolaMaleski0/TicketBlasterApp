import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './outlet-events-style/outlet-events-style.css';
import axios from 'axios';

export const OutletEvents = () => {
  const [events, setEvents] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const getEvents = async () => {
    try {
      const response = await axios.get('/api/v1/event/get-all-events');
      setEvents(response.data.data.event);
    } catch(err) {
      console.log(err);
    }
  };

  const deleteEventPopUp = () => {
    setShowPopUp(!showPopUp);
  };

  const deleteEvent = async () => {
    try {

      // console.log('selected event:', selectedEvent); 

      const response = await axios.delete(`/api/v1/event/delete-event/${selectedEvent}`);
      // console.log(response);
      if (response.status === 204) {
        setEvents(prevEvents => prevEvents.filter(event => event._id !== selectedEvent))
        setShowPopUp(false);
      };

    } catch(err) {  
      console.log(err);
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div id="outlet-events">
      <div className="events-admin">
        {events && events
          .map((event, i) => {
            return(
            <div key={i} className="events-admin-flex">
              <div className="events-admin-flex-left">
                <img src={`/images/${event.image}`} alt={event.name} className="events-admin-image" />
                <div className="events-admin-flex-left-content">
                  <p className="events-admin-name">{event.name}</p>
                  <div className="events-admin-flex-left-content-date-location">
                    <p className="events-admin-date">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="events-admin-location">{event.location}</p>
                  </div>
                </div>
              </div>
              <div className="events-admin-flex-right">
                <Link 
                  className="event-admin-delete-btn" 
                  onClick={() => {
                    deleteEventPopUp();
                    setSelectedEvent(event._id);
                  }}
                  >
                  Delete Event
                </Link>
              </div>
            </div> 
            )
          })
        }
      </div>
      {showPopUp && (
        <div className="popup-admin">
          <h2 className="popup-admin-title">Are you sure?</h2>
          <p className="popup-admin-text">You are about to delete an event from the system. Please proceed with caution.</p>
          <div className="popup-admin-flex">
            <Link 
              className="popup-cancel" 
              onClick={() => setShowPopUp(false)}
            >
              Cancel
            </Link>
            <Link 
              className="popup-delete-event-btn"
              onClick={() => deleteEvent(selectedEvent)}
              >
                Delete Event
            </Link>
          </div>
        </div>
      )}
    </div>
  )
};