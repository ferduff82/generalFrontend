const fs      = require('fs');
const path    = require('path');
const fetch  = require('node-fetch');
const http   = require('http');

const extensionServerUrl = process.env.EXT_SERVER_URL || 'http://localhost:3000';

const urlParse    = require ('url-parse');
var url = urlParse(extensionServerUrl, true);

var host = url.protocol + '//' + url.hostname

describe('Hello World', function() {
  'use strict';

  var responseObject;
  beforeEach(function(done) {
    http.get({
      hostname: url.hostname,
      port: url.port || 80,
      path: '/ccstorex/custom/v1/helloWorld',
      headers: {
        'Content-Type' : 'application/json',
        'x-ccasset-language' : 'en_US'
      },
      agent: false  // create a new agent just for this one request
    }, function (response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
        console.log ('incoming data ::' + body);
      });
      response.on('end', function() {
        responseObject = body;
        done();
      })
    });
  });


  it('returns helloWorld', function(done) {
    var jsonBody = JSON.parse(responseObject);
    expect(jsonBody).toEqual({message: "hello world"});
    done();
 });
});