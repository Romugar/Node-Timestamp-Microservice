// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// Timestamp microservice
app.get("/api/timestamp/:date_string?", function(req, res) {
  let date = null;
  let unixTime = null;
  let utcTime = null;
  let unixDate = parseInt(req.params.date_string * 1);
  if (req.params.date_string !== undefined) {
    if (isNaN(unixDate)) {
      date = new Date(req.params.date_string);
      unixTime = date.getTime();
      utcTime = date.toUTCString();
    } else {
      date = new Date(unixDate);
      unixTime = date.getTime();
      utcTime = date.toUTCString();
    }
  } else {
    date = new Date();
    unixTime = date.getTime();
    utcTime = date.toUTCString();
  }
  res.json({ unix: unixTime, utc: utcTime });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
