import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './stand-up-style/stand-up-style.css';

export const StandUp = () => {

  const [standUp, setStandUp] = useState([]);
  const [displayedStandUp, setDisplayedStandUp] = useState(6);

  const getStandUp = async () => {
    try {
      const response = await axios.get('/api/v1/event/get-all-events');
      setStandUp(response.data.data.event);
      // console.log(response);
      
    } catch(err) {
      console.log(err);
    }
  };

  const loadMore = () => {
    setDisplayedStandUp((displayedStandUp) => displayedStandUp + 6)
  };

  useEffect(() => {
    getStandUp();
  }, []);

  return (
    <div id="stand-up-shows">
      <h1 className="stand-up-heading">Stand-Up Comedy Shows</h1>
      <div className="stand-up-shows">
        <div className="shows">
          {standUp && standUp
          .filter(standup => standup.category === 'Stand-up Comedy')
          .slice(0, displayedStandUp)
          .map((standup, i) => {
            return(
              <div key={i} className="stand-up-flex">
                <div className="stand-up-flex-left">
                  <img src={`/images/${standup.image}`} alt={`${standup.name}`} className="stand-up-show-image" />
                </div>
                <div className="stand-up-flex-right">
                  <p className="stand-up-name">{standup.name}</p>
                  <p className="stand-up-date">
                    {new Date(standup.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="stand-up-details">{standup.eventDetails}</p>
                  <div className="stand-up-location-tickets-flex">
                    <p className="stand-up-location">{standup.location}</p>
                    <Link to={`/event/${standup._id}`} className="stand-up-location-link">Get Tickets</Link>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
        <Link className="link-to-all-stand-up-shows" onClick={loadMore}>Load More Stand-Up Comedy Shows</Link>
      </div>
    </div>
  )
};