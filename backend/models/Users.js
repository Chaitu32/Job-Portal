const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

// Create Schema
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		index: { unique:true}
	},
	date:{
		type: Date,
		required: false,
		default: Date.now
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	jobtype:{
		type: String,
		enum:["App","Rec"],
		required: true
	}
});

UserSchema.statics.authenticate = function (email, password, callback) {
	User.findOne({ email: email })
	  .exec(function (err, user) {
		if (err) {
		  return callback(err)
		} else if (!user) {
		  var err = new Error('User not found.');
		  err.status = 401;
		  return callback(err);
		}
		bcrypt.compare(password, user.password, function (err, result) {
		  if (result === true) {
			return callback(null, user);
		  } else {
			return callback();
		  }
		})
	  });
  }

const  User = mongoose.model("Users", UserSchema);
module.exports = User;
