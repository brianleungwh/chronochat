var Sequelize = require("sequelize");
var orm = new Sequelize("chronochat", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = orm.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  instanceMethods: {
    comparePassword: function(attemptedPassword, callback) {
      var hash = this.getDataValue('password');
      bcrypt.compare(attemptedPassword, hash, function(err, isMatch) {
        callback(isMatch);
      });
    },
    hashPassword: function() {
      var rawPW = this.getDataValue('password');
      var cipher = Promise.promisify(bcrypt.hash);
      return cipher(rawPW, null, null).bind(this)
        .then(function(hash) {
          console.log(hash);
          this.setDataValue('password', hash);
          // have to call save() otherwise data will not persist
          this.save()
        });
    }
  },
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

// order in which tables are synced matters
// because of foriegn key referencing
User.sync();
Board.sync();
Message.sync();

exports.User = User;
exports.Message = Message;
exports.Board = Board;
