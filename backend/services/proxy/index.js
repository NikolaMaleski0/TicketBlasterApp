const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: `${__dirname}/../../config.env` });

const api = express();

api.use(express.static('public'));

api.use(cors({
  origin: 'http://localhost:3000'
}));

api.use(morgan('dev'));

const authProxy = proxy(`http://localhost:${process.env.AUTH_PORT}`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  }
});

const eventProxy = proxy(`http://localhost:${process.env.EVENT_PORT}`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/event${req.url}`;
  }
});

const userProxy = proxy(`http://localhost:${process.env.USERS_PORT}`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/user${req.url}`;
  }
});

const uploadProxy = proxy(`http://localhost:${process.env.MULTER_UPLOAD_PORT}`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/upload${req.url}`;
  }
});

const ecommerceProxy = proxy(`http://localhost:${process.env.ECOMMERCE_PORT}`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/ecommerce${req.url}`;
  }
});

api.use('/api/v1/auth', authProxy);
api.use('/api/v1/event', eventProxy);
api.use('/api/v1/user', userProxy);
api.use('/api/v1/upload', uploadProxy);
api.use('/api/v1/ecommerce', ecommerceProxy);

api.listen(process.env.PROXY_PORT, (err) => {
  if (err) return console.log(err);
  console.log('Proxy service online!');
});