var mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

autoIncrement.initialize(mongoose.connection);

var accountSchema = new Schema({
  user_name: String,
  email: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required : true
  },
  account_status: {
    type: String
  },
  role: {
    type: String,
    default: "guest"
  },
  Pay: {
    type: Boolean
  },
  PaymentType: {
    type: String,
  },
  PayedDate: {
    type: String,
  },
  Duration: {
    type: String,
  },
  avatar: String
},{
  usePushEach : true
});

accountSchema.plugin(autoIncrement.plugin, 'data_accounts');
accountSchema.plugin(passportLocalMongoose);

accountSchema.methods.generateJwt = function() {
  var expiry = new Date();
  // expiry.setMinutes(expiry.getMinutes() + 1);
  expiry.setHours(expiry.getHours() + 4);

  return jwt.sign({
    userId: this._id,
    userName: this.user_name,
    email: this.email,
    accountStatus: this.account_status,
    avatar : this.avatar,
    role: this.role,
    Pay: this.Pay,
    PaymentType: this.PaymentType,
    PayedDate: this.PayedDate,
    exp: parseInt(expiry.getTime() / 1000),
    // exp: 1000,
  }, "bAKVdqczerYAYKdMxsaBzbFUJU6ZvL2LwZuxhtpS");
};

module.exports = mongoose.model('data_accounts', accountSchema);