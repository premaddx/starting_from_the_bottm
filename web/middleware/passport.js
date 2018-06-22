const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('nconf');

// used to serialize the user for the session
passport.serializeUser((obj, done) => {
  done(null, obj);
});

// used to deserialize the user
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// for facebook
passport.use(new FacebookStrategy({
  clientID: config.get('FACEBOOK_APP_ID'),
  clientSecret: config.get('FACEBOOK_APP_SECRET'),
  callbackURL: config.get('FACEBOOK_CALLBACK_URL'),
  profileFields: ['id', 'emails', 'name'],
}, (token, refreshToken, profile, done) => {
  //   process.nextTick(() => {
  //     const data = { token: token, profile: profile };
  //     done(null, data);
  //   });
  // check if already in our db records then 
  // create a entry and start a session
  // else just start a session
  logger.info(JSON.stringify(profile));
  const data = { token: token, profile: profile };
  return done(null, data);
}));


module.exports = passport;