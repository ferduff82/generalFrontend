var express = require('express'),
	app = express(),
	cron = require('node-cron'),
	jsdom = require("jsdom");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

cron.schedule('00 30 11 * * 1-5', function(){
  	console.log('running a task every weekday at 11:30: AM');
	jsdom.env("", ["http://code.jquery.com/jquery.min.js"], function(err, window) {
	    var $ = window.$
	    $.support.cors = true;
	    $.ajax({
	    	url : 'http://ws.geeklab.com.ar/dolar/get-dolar-json.php',
	    	mimeType:'application/json',
	    }).then(function(done) {
	        console.log(done);
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
  