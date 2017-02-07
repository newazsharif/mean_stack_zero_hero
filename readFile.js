var fs = require('fs');

console.log('file read started...........');

var  onFileLoad = function()
{
	console.log('file read done');
}
fs.readFile('readFile.js',onFileLoad)

console.log('file read ends..............')