var express = require('express');
var mongodb = require('mongodb');
var app = express.createServer(express.logger());
var url = require('url');
var log = console.log;
app.use(express.bodyParser());

process.env.MONGOHQ_URL= "mongodb://kabkee:kf3kd@linus.mongohq.com:10010/app13046795";
process.on('uncaughtException', function (err) {
 console.log('Caught exception: ' + err);
});

var connectionUri = url.parse(process.env.MONGOHQ_URL);
var dbName = connectionUri.pathname.replace(/^\//, '');

app.configure(function(){
    app.use('/css', express.static(__dirname + '/sites/css'));
    app.use('/js', express.static(__dirname + '/sites/js'));
    app.use('/fonts', express.static(__dirname + '/sites/fonts'));
    app.use('/images', express.static(__dirname + '/sites/images'));
});

app.all('/hi', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(request, response) {
  // response.send("What\'s up? This page is gonna be a great web app by Kabkee Moon :D<BR> Hold on a second.<br>You may visit <a href='https://googledrive.com/host/0B70xA4jw5f9benN1RzlCMkFMckE/index.html'>here</a>")
	response.sendfile(__dirname + '/sites/index.html');
});

app.post('/lots/search', function(request, response){
    console.log(request.body.catNo);
    mongodb.Db.connect(process.env.MONGOHQ_URL, function(error, client) {
        if (error) throw error;
        var docsArray=[];
        client.collectionNames(function(error, names){
            if(error) throw error;
            // output all collection names
            log("Collections");
            log("===========");
            var lastCollection = null;
            names.forEach(function(colData){
                var colName = colData.name.replace(dbName + ".", '')
                log(colName);
                lastCollection = colName;

                docsArray.push(colName);
            });

            var collection = new mongodb.Collection(client, lastCollection);
            log("\nDocuments in " + lastCollection);
            var documents = collection.find({}, {limit:5});

            // output a count of all documents found
            documents.count(function(error, count){
                log("  " + count + " documents(s) found");
                log("====================");

                // output the first 5 documents
                documents.toArray(function(error, docs) {
                    if(error) throw error;

                    docs.forEach(function(doc){
                        log(doc);
                    });
                    response.send(JSON.stringify(docsArray));

                    // close the connection
                    client.close();
                });
            });
        });
    });

});



//=====Server Setup=============================================================================

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});