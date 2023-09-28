const express = require('express');
const cors = require('cors');
const DB = require('../../pkg/db/index');
const ecommerce = require('./ecommerceHandler/ecommerceHandler');

const api = express();

api.use(cors());

DB.init();

api.use(express.json());
api.use(express.urlencoded({extended: true}));
api.use(express.static('public'));

api.post('/api/v1/ecommerce/add-ticket/', ecommerce.addTicket); // cart
api.post('/api/v1/ecommerce/process-payment/', ecommerce.processPaymentAddToHistory);
api.get('/api/v1/ecommerce/get-tickets-user/:userId', ecommerce.getTicketsForUser);
api.get('/api/v1/ecommerce/get-latest-tickets/:userId', ecommerce.getLastestTickets);
api.get('/api/v1/ecommerce/get-all-user-tickets-history/:userId', ecommerce.getAllTicketsHistoryOfUser);
api.delete('/api/v1/ecommerce/delete-event-from-cart/:ticketId/:eventToRemove', ecommerce.removeEventfromTicket);

api.listen(process.env.ECOMMERCE_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Ecommerce service online!');
});