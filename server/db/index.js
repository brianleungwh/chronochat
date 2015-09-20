var Sequelize = require("sequelize");
var orm = new Sequelize("chronochat", "root", "");


var User = orm.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Message = orm.define('Message', {
  text: Sequelize.STRING
});

var Board = orm.define('Board', {
  boardname: Sequelize.STRING
});

Message.belongsTo(User);
Board.hasMany(Message);
User.hasMany(Message);

User.sync({force: true});
Message.sync({force: true});
Board.sync({force: true});

exports.User = User;
exports.Message = Message;
exports.Board = Board;
