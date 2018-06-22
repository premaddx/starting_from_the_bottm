const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('nconf');

function basicMiddlewares(app) {
  // throws 400 error to next, if JSON is not valid
  app.use(bodyParser.json({
    limit: '50mb',
    strict: true,
  }));

  // parses the url encoded strings
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }));

  app.use(session({ /* setup session here */
    store: new RedisStore({
      url: config.get('REDIS_CONNECTION_URL'),
    }),
    secret: config.get('COOKIE_SECRET'), // for hashing session
    name: config.get('COOKIE_NAME'), // cookie name
    resave: true, // Save the session to store even if it has changed
    saveUninitialized: false, // dont create a session for anonymous users
    rolling: true, // Reset the cookie Max-Age on every request
    cookie: { // configuring cookie
      path: '/',
      httpOnly: true,
      maxAge: parseInt(config.get('COOKIE_TIMEOUT'), 10),
    },
  }));

  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  // logs incoming request in dev pattern
  // app.use(morgan('dev'));
  app.use(morgan(':method :status :res[content-length] - :response-time ms', { stream: logger.stream }));
  // CORS enabled
  app.use(cors());
}

module.exports = basicMiddlewares;