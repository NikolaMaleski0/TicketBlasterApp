const express = require('express');
const DB = require('../../pkg/db/index');
const multer = require('./uploadHanlder/uploadHanlder');
const cors = require('cors');

const api = express();
api.use(cors());

DB.init();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static('public'));

api.post('/api/v1/upload', multer.uploadImage, (req, res) => {res.status(200).json({
  status: 'Successfully uploaded image',
  data: req.file.filename
})});


api.listen(process.env.MULTER_UPLOAD_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Upload multer service online!');
});