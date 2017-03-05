var express = require('express'),
	app = express(),
	cron = require('node-cron'),
	jsdom = require("jsdom"),
	mongoose = require('mongoose'),
	db = require('./public/db/db-connection');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

//cron.schedule('00 30 11 * * 1-5', function(){
cron.schedule('* * * * *', function(){
  	console.log('running a task every weekday at 11:30: AM');
	jsdom.env("", ["http://code.jquery.com/jquery.min.js"], function(err, window) {
	    var $ = window.$
	    $.support.cors = true;
	    $.ajax({
	    	url : 'http://ws.geeklab.com.ar/dolar/get-dolar-json.php',
	    	mimeType:'application/json',
	    }).then(function(done) {

	        var dolar = new db({
    			dolaroficial: done.libre,
    			dolarblue: done.blue,
			});

			dolar.save(function(err) {
			  	if (err) throw err;
			  	console.log('Dolar saved successfully!');
			});

			db.find({}, function(err, dolars) {
				if (err) throw err;
			  	console.log(dolars);
			});
	    });
	});
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
  