const PassportJWT = require('passport-jwt'),
      ExtractJWT = PassportJWT.ExtractJwt,
      Strategy = PassportJWT.Strategy,
      config = require('./index.js'),
      models = require('@AskOracle/app/setup');


module.exports = (passport) => {
    const User = models.User;
    const parameters = {
      secretOrKey: config.secret,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    };

    passport.use(new Strategy(parameters, (req, payload, done) => {
      User.findOne({ _id: payload.id }, (error, user) => {
        if (error) return done(error, false);
        if (user) {
          req.user = user;
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }));
}
