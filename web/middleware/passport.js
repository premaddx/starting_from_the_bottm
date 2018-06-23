const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('nconf');
const { userDAO } = rootRequire('dao');

// used to serialize the user for the session
passport.serializeUser((obj, done) => {
  // console.log(user);
  // done(null, user._id);
  done(null, obj);
});

// used to deserialize the user
passport.deserializeUser((obj, done) => {
  // user.findById(id, function(err, user) {
  // 	done(err, user);
  // });
  done(null, obj);
});

// for facebook
passport.use(new FacebookStrategy({
  clientID: config.get('FACEBOOK_APP_ID'),
  clientSecret: config.get('FACEBOOK_APP_SECRET'),
  callbackURL: config.get('FACEBOOK_CALLBACK_URL'),
  profileFields: ['id', 'emails', 'name'],
}, (token, refreshToken, profile, done) => {
  // check if already in our db records then 
  // create a entry and start a session
  // else just start a session
  logger.info(JSON.stringify(profile));
  const data = { token: token, profile: profile };
  return done(null, data);

  // var me = new user({
  //   email:profile.emails[0].value,
  //   name:profile.displayName
  // });

  // /* save if new */
  // user.findOne({email:me.email}, function(err, u) {
  //   if(!u) {
  //     me.save(function(err, me) {
  //       if(err) return done(err);
  //       done(null,me);
  //     });
  //   } else {
  //     console.log(u);
  //     done(null, u);
  //   }
  // });
}));

module.exports = passport;