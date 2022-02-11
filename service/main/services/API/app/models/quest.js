const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  type: {
    type: Number,
    required: true
  },

  answer_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  question_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  question: {
    type: String,
    required: true
  },

  answer: {
    type: String
  }
});

mongoose.model('Quest', Schema);
