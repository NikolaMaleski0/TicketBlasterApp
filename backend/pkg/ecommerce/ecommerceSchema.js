const mongoose = require ('mongoose');
const Event = require('../events/eventSchema');

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  tickets: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
      },
      quantity: {
        type: Number
      }
    }
  ]
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;