var Sequelize = require("sequelize");
var orm = new Sequelize("chronochat", "root", "");
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var User = orm.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  getterMethods: {
    comparePassword: function(attemptedPassword, callback) {
      var hash = this.getDataValue('password');
      bcrypt.compare(attemptedPassword, hash, function(err, isMatch) {
        callback(isMatch);
      });
    }
  },
  setterMethods: {
    hashPassword: function() {
      var rawPW = this.getDataValue('password');
      var cipher = Promise.promisify(bcrypt.hash);
      return cipher(rawPW, null, null).bind(this)
        .then(function(hash) {
          this.setDataValue('password', hash);
        });
    }
  }
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
