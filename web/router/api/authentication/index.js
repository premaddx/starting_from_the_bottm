const { passport } = require('../../../middleware');
const testRoute = require('./testRoute');
const isLoggedInHandler = require('./isLoggedIn.handler');
const signUpHandler = require('./signup.handler');
const basicSignupHandler = require('./basicSignup.handler');

module.exports = (router) => {
router.get('/', testRoute);
router.post('/auth/login', isLoggedInHandler, basicSignupHandler);

/********  Social Signup  ************** */

router.post('/signup/facebook', signUpHandler);
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', isLoggedInHandler, passport.authenticate('facebook', { failureRedirect: 'https://www.google.com' }), (req, res) => {
  res.json({
    success: true,
    message: 'You have logged in successfully',
  });
});

/************************************** */
router.get('/logout', (req, res, next) => {
  req.logout();
  // deleting cookie
  res.clearCookie('TestAppSession', {
    path: '/',
  });
  // req.session.destroy(() => {
  //   // handle to clear session as much as possible
  //   req.session = null;
  //   res.json({
  //     success: true,
  //     payload: {
  //       message: 'You have been logged out',
  //     },
  //   });
});
});
};