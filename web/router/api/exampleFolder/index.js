const testRoute = require('./testRoute');

module.exports = (router) => {
  router.get('/test', testRoute);
};