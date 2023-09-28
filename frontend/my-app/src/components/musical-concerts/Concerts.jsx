import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './musical-concerts-style/musical-concerts.css';

export const Concerts = () => {

  const [concerts, setConcerts] = useState([]);
  const [displayedConcerts, setDisplayedConcerts] = useState(6);

  const getConcerts = async () => {
    try {
      const response = await axios.get('/api/v1/event/get-all-events');
      setConcerts(response.data.data.event);
      // console.log(response);
      
    } catch(err) {
      console.log(err);
    }
  };

  const loadMore = () => {
    setDisplayedConcerts((displayedConcerts) => displayedConcerts + 6)
  };

  useEffect(() => {
    getConcerts();
  }, []);

  return (
    <div id="musical-concerts">
      <h1 className="concerts-heading">Musical Concerts</h1>
      <div className="musical-concerts">
        <div className="concerts">
          {concerts && concerts
            .filter(concert => concert.category === 'Musical Concert')
            .slice(0, displayedConcerts)
            .map((concert, i) => {
              return(
                <div key={i} className="concert-flex">
                    <div className="concert-flex-left">
                      <img src={`/images/${concert.image}`} alt={concert.name} className="concert-image" />
                    </div>
                    <div className="concert-flex-right">
                      <p className="concert-name">{concert.name}</p>
                      <p className="concert-date">
                        {new Date(concert.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                      </p>
                      <p className="concert-details">{concert.eventDetails}</p>
                      <div className="concert-location-tickets-flex">
                        <p className='concert-location'>{concert.location}</p>
                        <Link to={`/event/${concert._id}`}className="concert-location-link">Get Tickets</Link>
                      </div>
                    </div>
                </div>
              )
            })
            }
        </div>
        <Link className="link-to-all-concerts" onClick={loadMore}>Load More Musical Concerts</Link>
      </div>
    </div>
  )
};