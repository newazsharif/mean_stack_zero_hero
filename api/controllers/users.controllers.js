var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken')
var User = mongoose.model('User');


module.exports.register = function(req,res)
{

	var user = new User(req.body);
	user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10))
	user.save(function(err,response)
	{
		if (err) {
			res.status(400).json(err)
		}
		else
		{
			res.status(201).json(response)
		}
	})
}

module.exports.login = function(req,res)
{
	User.findOne({
		username : req.body.username
		},function(err,response)
		{
			if (err) {
				res.status(400).json(err)
			}
			else if(!response)
			{
				res.status(404).json('user not found ')
			}
			else if(bcrypt.compareSync(req.body.password,response.password))
			{
				var token = jwt.sign({username : response.username},'secret',{expiresIn : 3600});
				res.status(200).json({success : true,token : token});
			}
			else
			{
				res.status(401).json("unauthrized user")
			}
		})
}
module.exports.authenticate = function(req,res,next)
{
	var headerExists = req.headers.authorization;
	console.log(req.headers)
	if(headerExists)
	{
		var token = req.headers.authorization.split(' ')[1];

		console.log(token);
		jwt.verify(token,'secret',function(error,decoded)
		{
			if(error)
			{
				res.status(400).json('unauthrized')
			}
			else
			{
				req.user = decoded.username;
				next();
			}
		})
	}
	else
	{
		res.json('no token provided')
	}
}