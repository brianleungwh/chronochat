// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "chronochat"
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connectied as id " + connection.threadId);
// });


// var done = function(err) {
//   if (err) {
//     console.log("failed to drop tables");
//     console.log(err);
//     return;
//   }
//   console.log("all tables dropped");
// }

// connection.query("drop table Users", function(err) {
//   connection.query("drop table Messages", function(err) {
//     connection.query("drop table Boards", done);
//   });  
// });
