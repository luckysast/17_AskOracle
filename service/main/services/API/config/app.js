const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      cors = require('cors'),
      consign = require('consign'),
      passport = require('passport'),
      passportConfig = require('./passport')(passport),
      jwt = require('jsonwebtoken'),
      config = require('./index.js'),
      database = require('./database')(mongoose, config);

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.set('oraclesecret', config.secret);

consign({ cwd: 'services' })
      .include('API/app/setup')
      .then('API/app/api')
      .then('API/app/routes')
      .into(app);
module.exports = app;
