const passport = require('passport'),
      config = require('@config'),
      models = require('@AskOracle/app/setup');

module.exports = (app) => {
  const api = app.API.app.api.quest;

  app.route('/api/v1/questions')
    .get(passport.authenticate('jwt', config.session), api.get_questions(models.User, models.Quest, app.get('oraclesecret')));
  app.route('/api/v1/answers')
    .get(passport.authenticate('jwt', config.session), api.get_answers(models.User, models.Quest, app.get('oraclesecret')));
  app.route('/api/v1/answer')
    .post(passport.authenticate('jwt', config.session), api.send_answer(models.User, models.Quest, app.get('oraclesecret')));
  app.route('/api/v1/question')
    .post(passport.authenticate('jwt', config.session), api.send_question(models.User, models.Quest, app.get('oraclesecret')));
}
