var express = require('express');
var app = express.createServer(express.logger());

process.on('uncaughtException', function (err) {
 console.log('Caught exception: ' + err);
});

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.configure(function(){
	app.use('/css', express.static(__dirname + '/sites/css'));
	app.use('/js', express.static(__dirname + '/sites/js'));
	app.use('/fonts', express.static(__dirname + '/sites/fonts'));
	app.use('/images', express.static(__dirname + '/sites/images'));
});


app.get('/', function(request, response) {
  // response.send("What\'s up? This page is gonna be a great web app by Kabkee Moon :D<BR> Hold on a second.<br>You may visit <a href='https://googledrive.com/host/0B70xA4jw5f9benN1RzlCMkFMckE/index.html'>here</a>")
	response.sendfile(__dirname + '/sites/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});