// App

const express = require('express'); // HTTP server
const morgan = require('morgan'); // HTTP logging
const helmet = require('helmet'); // secure HTTP headers
const cors = require('cors'); // HTTP CORS

const { NODE_ENV } = require('./config');
const logger = require('./logger');

const app = express();

// global middleware
const morganSetting = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));

app.use(helmet());

// routes
// public static files
app.use(express.static('public'));

app.get('/test', cors(), (req, res) => {
  res.json({ data: 'test' });
});

app.post('/test', cors(), express.json(), (req, res) => {
  res.json(req.body);
});

// global error handler
app.use(function errorHandler(error, req, res, next) {
  logger.error(error);
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
