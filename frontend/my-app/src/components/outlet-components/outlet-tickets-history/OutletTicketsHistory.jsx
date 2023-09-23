import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import './outlet-tickets-history-style/outlet-tickets-history.css';
import axios from 'axios';
import qrImg from '../../logo/qr.png';
import logoDark from '../../logo/logo-dark.png';

export const OutletTicketsHistory = () => {
  const [tickets, setTickets] = useState([]);
  const { userId } = useContext(AuthContext);
  const [popupPrint, setPopupPrint] = useState(false);
  const [popupDetailsPrint, setPopupDetailsPrint] = useState(null);

  const popupPrintClose = () => {
    setPopupDetailsPrint(null);
    setPopupPrint(false);
  }

  const isEventOutdated = (eventDate) => {
    const currentDate = new Date();
    return currentDate > new Date(eventDate);
  }

  const getAllTickets = async () => {
    try {
      const response = await axios.get(`/api/v1/ecommerce/get-tickets-user/${userId}`);
      setTickets(response.data.data.ticket.tickets);
      console.log(response);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return(
    <div id="outlet-tickets-history">
      {tickets.length === 0 ? (
        <p className="tickets-history-no-tickets">No tickets history available.</p>
      ) : (
        <div className="outlet-tickets-history-flex">
         {tickets.map((ticket, i) => {
            const isOutdated = isEventOutdated(ticket.date);
            const ticketAddClass = isOutdated ? 'outlet-ticket-history-flex opacity-event' : 'outlet-ticket-history-flex'
            return(
              <div className="outlet-ticket-history-flex" key={i}>
                <img src={`/images/${ticket.image}`} alt={ticket.name} className="ticket-history-image" />
                <div className="ticket-history-inner-flex">
                  <h2 className="ticket-history-title">{ticket.name}</h2>
                  <p className="ticket-history-date">
                    {new Date(ticket.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })},
                  </p>
                  <p className="ticket-history-details">{ticket.eventDetails}</p>
                  <div className="ticket-history-location-button-flex">
                    <p className="ticket-history-details-location">{ticket.location}</p>
                    <Link 
                      className="tickets-history-button-print" 
                      onClick={() => {
                        setPopupPrint(true);
                        setPopupDetailsPrint(ticket);
                      }}
                      >
                        Print
                    </Link>
                  </div>
                </div>
              </div>
            )
          })  
        }
      </div>
      )}
      {popupPrint && popupDetailsPrint && (
        <div className="popup-print" onClick={popupPrintClose}>
          <div className="popup-print-flex">
            <div className="popup-print-flex-top">
              <div>
                <img src={logoDark} alt="logo-dark"  className="popup-logo-dark"/>
              </div>
              <div>
                <img src={`/images/${popupDetailsPrint.image}`} alt={popupDetailsPrint.name} className="popup-print-image" />
              </div>
            </div>
            <div className="popup-print-flex-bottom">
              <div className="popup-print-flex-bottom-inner">
                <div className="popup-print-flex-bottom-inner-left">
                  <p className="popup-print-title">{popupDetailsPrint.name}</p>
                  <p className="popup-print-date">
                    {new Date(popupDetailsPrint.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                  </p>
                  <p className="popup-print-location">{popupDetailsPrint.location}</p>
                </div>
                <img src={qrImg} alt="qr-code" className="image-qr" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};