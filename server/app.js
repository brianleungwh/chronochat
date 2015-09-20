var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");




var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));





console.log("ChronoChat is listening on 8080");
app.listen(8080);