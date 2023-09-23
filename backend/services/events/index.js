const express = require('express');
const eventHandler = require('./eventHandler/eventHandler');
const multer = require('../upload/uploadHanlder/uploadHanlder');
const DB = require('../../pkg/db/index');
const cors = require('cors');

const api = express();

api.use(cors());

DB.init();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static('public'));

api.get('/api/v1/event/get-all-events', eventHandler.getAllEvents);
api.get('/api/v1/event/get-one-event/:id', eventHandler.getOneEvent);
api.post('/api/v1/event/create-event', multer.uploadImage, eventHandler.createEvent);
api.patch('/api/v1/event/update-event/:id', multer.uploadImage, eventHandler.updateEvent);
api.delete('/api/v1/event/delete-event/:id', eventHandler.deleteEvent);

api.listen(process.env.EVENT_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Event service online!');
});