const path = require('path');
/**
 * Bootstrap application file
 *
 * This is the main entry point of the application.
 * It will load configurations, initialize the app and start the express server
 *
 */
require('dotenv').config({ path: path.join(__dirname, '/.env') });
// set globals
require('./globals');

// load config
require('./config/env').init();

const { appServer, init: initServer } = require('./web/server');
require('./gracefullyShutDown')(appServer);

// if we are going to use redis then add the config for that
initServer();