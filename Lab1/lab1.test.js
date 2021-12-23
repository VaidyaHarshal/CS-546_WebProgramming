const lab1 = require("./lab1");

// QuestionOne
console.log(lab1.questionOne([5,3,10]));
// should return and output: { '2': true, '18': false, '93': false }
console.log(lab1.questionOne([2]));
// should return and output: { '3': true }
console.log(lab1.questionOne([]));
// should return and output: {}
console.log(lab1.questionOne());
// should return and output: {}
console.log(lab1.questionOne([1,0,0,0,0,0]));
// should return and output: { '6': false, '7': true }

// QuestionTwo
console.log(lab1.questionTwo([1,1,1,1,1,1]));
// should return and output: [ 1 ]
console.log(lab1.questionTwo([1,'1',1,'1',2]));
// should return and output: [ 1, '1', 2 ]
console.log(lab1.questionTwo([3,'a','b',3,'1']));
// should return and output: [ 3, 'a', 'b', '1' ]
console.log(lab1.questionTwo([]));
// should return and output: []
console.log(lab1.questionTwo());
// should return and output: []

// QuestionThree
console.log(lab1.questionThree(["cat","act","foo","bar"]));
// should return and output: { act: [ 'cat', 'act' ] }
console.log(lab1.questionThree(["race","care","foo","foo","foo"]));
// should return and output: { acer: [ 'race', 'care' ] }
console.log(lab1.questionThree(["foo","bar","test","Harshal","Vaidya"]));
// should return and output: {}
console.log(lab1.questionThree([]));
// should return and output: {}
console.log(lab1.questionThree(["miles","cat","lmise","tca","act","Harshal","arshalh","abc","acd"]));
// should return and output: { eilms: [ 'miles', 'lmise' ], act: [ 'cat', 'tca', 'act' ] }

// QuestionFour
console.log(lab1.questionFour(1,3,2));
// should return and output: 4
console.log(lab1.questionFour(2,5,6));
// should return and output: 194
console.log(lab1.questionFour(0,0,1));
// should return and output: 9
console.log(lab1.questionFour(11,2,11));
// should return and output: 9979200
console.log(lab1.questionFour(1,0,1));
// should return and output: 4