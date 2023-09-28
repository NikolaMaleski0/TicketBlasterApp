const mongoose = require('mongoose');
const Ticket = require('./ecommerceSchema');

const ticketHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  historyTickets: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
      },
      quantity: {
        type: Number
      },
      timeStamp: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

const TicketsHistory = mongoose.model('ticketsHistory', ticketHistorySchema);

module.exports = TicketsHistory;