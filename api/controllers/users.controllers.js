var mongoose = require('mongoose');
var User = mongoose.model('User');



module.exports.register = function(req,res)
{
	var user = new User(req.body);
	user.save(function(err,response)
	{
		if (err) {
			res.status(400).json(err)
		}
		else
		{
			res.status(200).json(response)
		}
	})
}