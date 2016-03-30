// Set up
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// Change work directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Routes */
app.post('/', function(req, res) {
  //console.log(req.body.commands);
  //res.sendfile('./public/index.html'); // Unique page
  var lines = req.body.commands.split('\n');
  var error = execute(lines);
  console.log(error in errors);
  res.end("yes"); // Finish with "yes"
});

// Listen (start app with node server.js)
app.listen(8080, function(){
  console.log("Cube Summation listening on port 8080");
});

// Error object
errors = {
  101: "Bad number of test cases",
  201: "Matrix size error",
  202: "Operations number invalid",
  203: "Number of operations unsuccessful",
  301: "Invalid command",
  302: "Number of parameters unsuccessful",
  303: "Parameters error"
};

// Validate data and execute
execute = function(lines) {
  // Test Case validation: 1 <= T <= 50
  if (!(isNumber(lines[0]) && (1 <= parseInt(lines[0])) && (parseInt(lines[0]) <= 50))) {
    return 101;
  }
  // Operations parameters
  var test_case = new Array();
  var number = 0;
  var line_number = 1;
  var parameters = "";
  var command = "";
  var operations = 0;
  var size = 0;
  do {
    number++;
    parameters = lines[line_number].split(" ");
    // Matrix size validation: 1 <= N <= 100 
    size = parseInt(parameters[0]);
    if (!(isNumber(parameters[0]) && (1 <= size) && (size <= 100))) {
      return 201;
    }
    // Operations numbers validation: 1 <= M <= 1000
    operations = parseInt(parameters[1]);
    if (!(isNumber(parameters[1]) && (1 <= operations) && (operations <= 1000))) {
      return 202;
    }
    // Commands (query or update only)
    for(var i = 0; i < operations; i++){
      line_number += 1;
      // Overflow
      if (line_number == lines.length && i < operations) {
        return 203;
      }
      command = lines[line_number].split(" ");
      if (command[0] == "UPDATE") { // UPDATE
        if (command.length < 4) {
          return 302;
        // Validate parameters: 1 <= x,y,z <= N 
        } else if (!(isNumber(command[1]) && (1 <= parseInt(command[1])) && (parseInt(command[1]) <= size))) {
          return 303;
        } else if (!(isNumber(command[2]) && (1 <= parseInt(command[2])) && (parseInt(command[2]) <= size))) {
          return 303;
        } else if (!(isNumber(command[3]) && (1 <= parseInt(command[3])) && (parseInt(command[3]) <= size))) {
          return 303;
        // Validate parameters: -109 <= W <= 109
        } else if (!(isNumber(command[4]) && (-10000000000 <= parseInt(command[4])) && (parseInt(command[4]) <= 10000000000))) {
          return 303;
        }
      } else if (command[0] == "QUERY") { // QUERY
        if (command.length < 6) {
          return 302;
        } else if (!(isNumber(command[1]) && isNumber(command[2]) && isNumber(command[3]) 
                 && isNumber(command[4]) && isNumber(command[5]) && isNumber(command[6]))) {
          return 303;
        // Validate parameters: 1 <= x1 <= x2 <= N
        } else if (!((1 <= parseInt(command[1])) && (parseInt(command[1]) <= parseInt(command[4])) && (parseInt(command[4]) <= size))) {
          return 303;
        // Validate parameters: 1 <= y1 <= y2 <= N 
        } else if (!((1 <= parseInt(command[2])) && (parseInt(command[2]) <= parseInt(command[5])) && (parseInt(command[5]) <= size))) {
          return 303;
        // Validate parameters: 1 <= z1 <= z2 <= N 
        } else if (!((1 <= parseInt(command[3])) && (parseInt(command[3]) <= parseInt(command[6])) && (parseInt(command[6]) <= size))) {
          return 303;
        }
      } else {
        return 301;
      }
    }
    line_number += 1;
  } while (line_number < lines.length);
  // All correct!
  return 0;
}

// Is a Number? function
function isNumber(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}
