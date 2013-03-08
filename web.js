var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('What\'s up? This page is gonna be a great web app by Kabkee Moon :D<BR> Hold on a second.<br>You may visit <a href="https://googledrive.com/host/0B70xA4jw5f9benN1RzlCMkFMckE/index.html">here</a>');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});