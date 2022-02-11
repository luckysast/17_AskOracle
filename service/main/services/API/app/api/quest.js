const mongoose = require('mongoose');

const api = {};

api.send_question = (User, Quest, Token) => (req, res) => {
  if (Token) {
    const quest = new Quest({
      title: req.body.title,
      type: req.body.type,
      answer_user_id: req.body.answer_user_id,
      question_user_id: req.user.id,
      question: req.body.question
    });

    quest.save(error => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, message: "Quest sended" });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.send_answer = (User, Quest, Token) => (req, res) => {
  if (Token) {
    Quest.findOne({ _id: req.body.quest_id, answer: null }, (error, quest) => {
      if (error) res.status(400).json(error);

      if (quest) {
        quest.answer = req.body.answer;

        quest.save(error => {
          if (error) res.status(400).json(error)
          res.status(200).json({ success: true, message: "Answer sended" })
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid quest" })
      }
    })

  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.get_answers = (User, Quest, Token) => (req, res) => {
  if (Token) {
    Quest.find({ answer_user_id: (req.query.user_id ? req.query.user_id : req.user.id), answer: {$ne: null} }, (error, answers) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(answers);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.get_questions = (User, Quest, Token) => (req, res) => {
  if (Token) {
    Quest.find({ answer_user_id: (req.query.user_id ? req.query.user_id : req.user.id), answer: null }, (error, questions) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(questions);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

module.exports = api;
