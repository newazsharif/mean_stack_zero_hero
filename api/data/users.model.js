var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
{
	username : {
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true,
	},
	name : String

})

mongoose.model('User',userSchema,'users');