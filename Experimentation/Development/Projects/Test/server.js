var express = require('express');
var app = express();
var path = require('path');
var opn = require('opn');

app.use(express.static(__dirname + '/public'));  

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8000, 'localhost', function(){
	opn('http://localhost:8000', {app: 'chrome'});
	console.log('Server running at: localhost:8000');
});