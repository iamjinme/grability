// Set up
var express = require('express');
var app = express();

// Change work directory
app.use(express.static(__dirname + '/public'));

// Listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");
