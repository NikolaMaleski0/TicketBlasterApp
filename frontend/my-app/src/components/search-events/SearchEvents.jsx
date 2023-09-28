import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './search-event-bar-style/search-events-bar.css';


export const SearchEvents = () => { 
  const { searchQuery, updatedSearchQuery } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const searchedEvents = async () => {
    try {
      const response = await axios.get('/api/v1/event/get-all-events');
      const allEvents = response.data.data.event;
      // console.log(response); 

      const filteredEvents = allEvents.filter(event => {
        return (
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          event.date.toLowerCase().includes(searchQuery.toLowerCase()) || 
          event.eventDetails.toLowerCase().includes(searchQuery.toLowerCase())
          )
      });

      setEvents(filteredEvents);
      // console.log(filteredEvents);

      localStorage.setItem('searchQuery', searchQuery);

    } catch(err) {  
      console.log(err);
    };
  };

  useEffect(() => {
    const localQuery = localStorage.getItem('searchQuery');
    if (localQuery) {
      updatedSearchQuery(localQuery);
      searchedEvents();
    } 
    
  }, [updatedSearchQuery]);


  console.log(searchQuery); 
  return(
    <div id="search-events">
      <h1 className="search-events-title">Search Results for: {searchQuery}</h1>
      <div className="search-events">
        { events.length > 0 ? (
          events.map((event, i) => {
            return(
              <div key={i} className="search-events-flex">
                <div className="search-events-flex-left">
                  <img src={`/images/${event.image}`} alt={event.name} className="search-events-image" />
                </div>
                <div className="search-event-flex-right">
                  <div className="search-event-flex-inner-left">
                    <p className="search-event-name">{event.name}</p>
                    <p className="search-event-details">{event.eventDetails}</p>
                    <p className="search-event-date">
                      {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                    </p>
                    <p className="search-event-location">{event.location}</p>
                  </div>
                  <div className="search-event-flex-inner-right">
                    <Link className="search-events-button" to={`/event/${event._id}`}>Get tickets</Link>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p className="no-match">No matches found.</p>
        )}
      </div>
    </div>
  )
}