var express = require('express');

var app = express();

/// Include the express body parser
app.configure(function () {
  app.use(express.bodyParser());
});

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";

app.get('/', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html' });
	res.end(form);

});

/// Include the node file module
var fs = require('fs');

/// Post files
app.post('/upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		  var newPath = __dirname + "/uploads/fullsize/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

		  	/// let's see it
		  	res.redirect("/uploads/fullsize/" + imageName);

		  });
		}
	});
});

/// Show files
app.get('/uploads/fullsize/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

app.listen(8080);