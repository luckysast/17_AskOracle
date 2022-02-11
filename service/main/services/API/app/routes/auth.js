const models = require('@AskOracle/app/setup');

module.exports = (app) => {
  const api = app.API.app.api.auth;

  app.route('/')
     .get((req, res) => res.send('Ask Oracle API'));

  app.route('/api/v1/auth')
     .post(api.login(models.User));
}
