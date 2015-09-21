var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var util = require("./utils/utility");
var boardRouter = require(...);



var db = require("/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(__dirname + "/../client"));

app.use(session({
  secret: "notsosecret",
  resave: false,
}));

app.get("/", util.checkUser, function(req, res) {
  res.redirect("/boards");
});

app.get("/signup", function(req, res) {
  // serve signup page
});

app.post("/signup", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  // check if username exists
  // if yes alert user
  // if not create new user entry and create new session
  //   and redirect to /boards
});

app.get("/signin", function(req, res) {
  // serve signin page
});

app.post("/signin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  check if username exists in table 
  // if not alert client
  // if yes check comparePassword with getter
  //   if matches
  //     creates session and redirect to /boards
  //   if not alert user
});

app.use("/boards", util.checkUser, boardRouter);



var app = express();

console.log("ChronoChat is listening on 8080");
app.listen(8080);
