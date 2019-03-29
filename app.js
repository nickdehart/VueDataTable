var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var path = require("path");

const PORT = 3000;

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + "/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "abc123", resave: true, saveUninitialized: true }));
app.set("secret", "abc123");

// Start up the server
http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});

app.get("/data", function(req, res) {
  console.log("data");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
