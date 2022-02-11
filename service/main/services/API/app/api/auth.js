const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      config = require('@config');

const api = {};

api.login = (User) => (req, res) => {
    let query = {
    	username: req.body.username,
    	password: req.body.password
    }

    User.find(query, (error, user) => {
      if (error) throw error;

      if (user.length === 0) {
          res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        user = user[0]
        const payload = {
          id: user._id,
          name: user.username
        }
        const token = jwt.sign(payload, config.secret);
        res.json({ success: true, message: 'Token granted', token, user: user});
      }
    });
}

api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ');
  if (split.length === 2) return split[1];
    else return null;
  } else return null;
}

module.exports = api;
