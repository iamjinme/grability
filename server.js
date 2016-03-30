// Set up
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// Change work directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");

/* Routes */
app.post('/', function(req, res) {
  console.log(req.body.commands);
  res.sendfile('./public/index.html'); // Unique page
});

