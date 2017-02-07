require('./instantHello');
var goodBye = require('./talk/goodBye');
var talk = require('./talk');
var question = require('./talk/question')



goodBye();
talk.intro();
talk.hello('Shakil'); 
var result = question.ask();
console.log(result);