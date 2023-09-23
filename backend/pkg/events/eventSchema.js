const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String
  },
  date: {
    type: Date
  },
  location : {
    type: String
  },
  category: {
    type: String,
    enum: ['Musical Concert', 'Stand-up Comedy']
  },
  eventDetails: {
    type: String
  },
  image: {
    type: String,
  },
  genre: {
    type: String,
    enum: ['rock', 'metal', 'heavy metal', 'dance', 'electronic', 'comedy']
  },
  relatedActs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event'
    }
  ],
  price: {
    type: String
  }
});

const Event = mongoose.model('event', eventSchema);
