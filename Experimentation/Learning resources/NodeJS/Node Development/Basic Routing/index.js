// stand-alone index.js

const winston = require('winston');
const express = require('express');
const app = express();

const logger = new (winston.Logger)({
  levels: {
    error: 0,
    warning: 1,
    info: 2,
    debug: 3
  },
  transports: [
    new (winston.transports.Console)(
      {level : 'debug', colorize: true}
    )
  ]
});

app.use(function(req, res, next) {
  'use strict';
  if (!res.locals) {
    res.locals = {};
  }
  //http://expressjs.com/en/api.html#res.locals
  //use res.locals to pass object between main and sub apps
  res.locals.logger = logger;
  next();
});

app.use ("/ccstorex/custom", require ("./app/index"));

// Read port from command line, config, or default
var port = (process.argv[2] || (process.env.npm_package_config_port || 3000));

app.listen(port, function () {
  'use strict';
  logger.info('Listening on port ' + port +'...');
  logger.debug('Debug : Listening on port ' + port +'...');
});
