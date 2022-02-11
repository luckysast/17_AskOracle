const mongoose = require('mongoose');
const api = {};

api.index = (User, OracleToken) => (req, res) => {
  const token = OracleToken;

  if (token) {
    if (req.query.user_id) {
      User.findOne({_id: req.query.user_id}, (error, users) => {
        if (error) throw error;
        res.status(200).json(users);
      });
    } else {
      User.find({}, (error, users) => {
        if (error) throw error;
        res.status(200).json(users);
      });
    }
  } else {
    return res.status(403).send({ success: false, message: 'Unauthorized' });
  }
}

api.signup = (User) => (req, res) => {
  if (!req.body.username || !req.body.password) {
      res.json({ success: false, message: 'Please, pass a username and password.' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save((error) => {
      if (error) return res.status(400).json({ success: false, message:  'Username already exists.' });
      res.json({ success: true, message: 'Account created successfully' });
    })
  }
}

module.exports = api;
