const express = require('express');
const userHandler = require('./handlers/userHandlers');
const multer = require('../upload/uploadHanlder/uploadHanlder');
const DB = require('../../pkg/db/index');
const cors = require('cors');

const api = express();
api.use(cors());
api.use(express.static('public'));

DB.init();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static('public'));

api.get('/api/v1/user/get-all-users', userHandler.getAllUsers);
api.get('/api/v1/user/get-user/:id', userHandler.getOneUser);
api.patch('/api/v1/user/update-user/:id', multer.uploadImage, userHandler.updateUser);
api.patch('/api/v1/user/update-user/promote-demote/:id', userHandler.promoteDemote);
api.patch('/api/v1/user/update-user/change-password/:id', userHandler.userChangePassword);
api.delete('/api/v1/user/delete-user/:id', userHandler.deleteUser);

api.listen(process.env.USERS_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Users service online!');
});