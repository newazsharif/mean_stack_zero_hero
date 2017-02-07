var filename = 'index.js';
var hello = function(name)
{
	console.log('this is a hello for '+name);
}
var intro = function ()
{
	console.log('hello from '+filename);
}

module.exports = 
{
	hello : hello,
	intro : intro
};