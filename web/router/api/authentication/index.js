const { passport } = require('../../../middleware');
const testRoute = require('./testRoute');
const isLoggedIn = require('./isLoggedIn.controller');

module.exports = (router) => {
  router.get('/', testRoute);
  router.get('/auth/facebook', passport.authenticate('facebook'));
  router.get('/auth/facebook/callback', isLoggedIn, passport.authenticate('facebook', { failureRedirect: '/api/v1' }), (req, res) => {
    res.redirect('/api/v1');
  });
  router.get('/logout', (req, res, next) => {
    req.logout();
    // deleting cookie
    res.clearCookie('TestAppSession', {
      path: '/',
    });
    req.session.destroy(() => {
      // handle to clear session as much as possible
      req.session = null;
      res.json({
        success: true,
        payload: {
          message: 'You have been logged out',
        },
      });
    });
  });
};