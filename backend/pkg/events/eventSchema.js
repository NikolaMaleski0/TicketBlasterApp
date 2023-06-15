const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String
  },
  category: {
    type: String,
    enum: ['Musical Concert', 'Stand-up Comedy']
  },
  date: {
    type: String
  },
  eventDetails: {
    type: String
  },
  location : {
    type: String
  },
  eventImage: {
    type: String
  },
  price: {
    type: String
  }
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;