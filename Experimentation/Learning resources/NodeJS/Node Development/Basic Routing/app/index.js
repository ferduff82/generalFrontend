const express = require('express');
const router  = new express.Router();
const fetch  = require('node-fetch');
const https = require('https');

router.get('/v1/helloWorld', function(req, res){
  'use strict';
  res.locals.logger.debug ("Debug: GET helloWorld");
  var response = {
    "message": "hello world"
  };
  res.status(200).json(response);
});

router.get('/v1/securedHelloWorld', function(req, res){
  'use strict';
  res.locals.logger.debug ("Debug: GET securedHelloWorld");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  fetch('https://ccadmin-test-z66a.oracleoutsourcing.com/ccstorex/custom/v1/helloWorld', {agent: new https.Agent({agent:false})})
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      res.status(200).json(json);
    }).catch(function(err) {
    res.locals.logger.error(err);
  });
});

router.post('/v1/helloWorld', function(req, res){
  'use strict';
  res.locals.logger.debug ("Debug: POST helloWorld");
  var response = {
    "message": "hello world post message"
  };
  res.status(200).json(response);
});

module.exports = router;