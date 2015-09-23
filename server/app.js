var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var util = require("./utils/utility");
var db = require("./db/index.js");
var morgan = require("morgan");

var app = express();

app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');
app.use(morgan("dev")); // logs GET and POST requests
app.use(bodyParser.json()); // parses request's bodies req.body
app.use(bodyParser.urlencoded({ extended:true }));

// tells express where to look for client files to serve
app.use(express.static(__dirname + "/../client"));

app.use(session({
  secret: "notsosecret",
  resave: false,
}));

app.allBoards = {};

app.get("/", util.checkUser, function(req, res) {
  res.redirect("/boards");
});

// dont need
// app.get("/signup", function(req, res) {
//   // serve signup page
// });

app.post("/signup", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  // check if username exists
  // if yes alert user
  // if not create new user entry and create new session
  //   and redirect to /boards
  db.User.count({
    where: {username: username}
  }).then(function(count) {
    if (count > 0) {
      console.log('Username taken');
    } else {
      db.User.create({
        username: username,
        password: password
      }).then(function(user) {
        user.hashPassword();
        util.createSession(req, res, user);
      });
    }
  });
});


// dont need
// app.get("/signin", function(req, res) {
//   // serve signin page
//   res.redirect('/auth');
// });

app.post("/signin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  // check if username exists in table 
  // if not alert client
  // if yes check comparePassword with getter
  //   if matches
  //     creates session and redirect to /boards
  //   if not alert user
  db.User.findOne({
    where: {username: username}
  }).then(function(user) {
    if (!user) {
      console.log('unregistered account');
      res.redirect('/signup');
    } else {
      user.comparePassword(password, function(match) {
        if (match) {
          console.log('matched!');
          util.createSession(req, res, user);
        } else {
          console.log('incorrect password');
        }
      });
    }
  });
});

app.get("/boards/allboards", function(req, res) {
  db.Board.findAll().then(function(boards) {
    res.json(boards);
  });
});

app.post("/boards/allboards", function(req, res) {
  console.log('called');
  var newBoard = req.body.boardname;
  // interact with db
  // if already exists alert user and redirect user to that board
  // create new board if doesn't already exists and redirect to new board
  db.Board.findOne({
    where: {boardname: newBoard}
  }).then(function(board) {
    if (board) {
      console.log('Board already exists');
      // redirect to that board
    } else {
      db.Board.create({boardname: newBoard})
        .then(function(board) {
          console.log(board + " created");
          // redirect to board
        });
    }
  });
  res.send(201);
});
app.get("/board/msgs/*", function(req, res) {
  // parse req.url
  console.log('getting msgs');
  var boardname = req.url.split('/').pop().split('?')[0];
  console.log(boardname);
  db.Board.findOne({where: {boardname: boardname}})
    .then(function(board) {
      db.Message.findAll({where: {BoardId: board.id}, include: [db.User]})
        .then(function(boards) {
          console.log(boards);
          res.json(boards);
        })
    });
});

app.get("/board/*", function(req, res) {
  // parse req.url
  var boardname = req.url.split('/').pop();
  res.render('board', {boardname: boardname});
});



app.post("/board/*", function(req, res) {
  var boardname = req.url.split('/').pop();
  var message = req.body.message;
  var username = req.session.user.username;

  db.User.findOne({ where: {username: username}})
    .then(function(user) {
      db.Board.findOne({where: {boardname: boardname}})
        .then(function(board) {
          db.Message.create({
            UserId: user.id,
            BoardId: board.id,
            text: message
          })
        })
      })
});



// app.get("/boards/*", util.checkUser, function(req, res) {
//   // get board name
//   // check with db see if it exists
//   // if yes display all msg from that board
//   // if not redirect to all boards
// });

// app.post("/boards/*", util.checkUser, function(req, res) {
//   // get board name
//   // check with db to see if board exists
//   // if not redirect to board
//   // if yes make a new entry to db
// })


console.log("ChronoChat is listening on 8080");
app.listen(8080);
