const express = require('express');
const auth = require('./handlers/authHandler');
const DB = require('../../pkg/db/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const api = express();
api.use(cors());

DB.init();

api.use(express.json());
api.use(cookieParser());
api.use(express.static('public'));


api.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

api.post('/api/v1/auth/create-account', auth.signUp);
api.post('/api/v1/auth/log-in', auth.login);
api.get('/api/v1/auth/log-out', auth.logOut);

api.listen(process.env.AUTH_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Authentication service online!');
});
api.listen(process.env.PORTAUTH, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log(`Service started succesfully on port ${process.env.PORTAUTH}`);
});