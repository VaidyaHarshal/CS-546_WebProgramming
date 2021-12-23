const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

try {
    console.log(arrayUtils.average([[1,3], [2,4,5]]));
} catch(e) {
    console.log(e);
}
try {
    console.log(arrayUtils.average([[], [1,3],[2,4,5]]));
} catch(e) {
    console.log(e);
}

try {
    console.log(arrayUtils.modeSquared([1, 2, 3, 5, 4]));
} catch(e) {
    console.log(e);
}
try {
    console.log(arrayUtils.modeSquared(["guitar", 1, 3, "apple"]));
} catch(e) {
    console.log(e);
}

try {
    console.log(arrayUtils.medianElement([7, 6, 5, 8, 9]));
} catch(e) {
    console.log(e);
}
try {
    console.log(arrayUtils.medianElement("test"));
} catch(e) {
    console.log(e);
}

try {
    console.log(arrayUtils.merge([1, 2, 3, 'g'], ['d','a', 's']));
} catch(e) {
    console.log(e);
}
try {
    console.log(arrayUtils.merge([], ['ab', 'ts']));
} catch(e) {
    console.log(e);
}

try {
    console.log(stringUtils.sortString('123 FOO BAR!'));
} catch(e) {
    console.log(e);
}
try {
    console.log(stringUtils.sortString(123));
} catch(e) {
    console.log(e);
}

try {
    console.log(stringUtils.replaceChar("Dadadddy",2));
} catch(e) {
    console.log(e);
}
try {
    console.log(stringUtils.replaceChar(123));
} catch(e) {
    console.log(e);
}

try {
    console.log(stringUtils.mashUp("Patrick","Hill","$"));
} catch(e) {
    console.log(e);
}
try {
    console.log(stringUtils.mashUp(""," ",""));
} catch(e) {
    console.log(e);
}

try {
    console.log(objUtils.computeObjects([{x: 1, y: 2, z: 3}, {x: 2, z: 5}], x => x * x));
} catch(e) {
    console.log(e);
}
try {
    console.log(objUtils.computeObjects([{x: 2, y: 3}, {z: 6}], "x => x * 2"));
} catch(e) {
    console.log(e);
}

try {
    console.log(objUtils.commonKeys({a: 2, b: {x: 7}}, {a: 3, b: {x: 7, y: 10}}));
} catch(e) {
    console.log(e);
}
try {
    console.log(objUtils.commonKeys({}, {}));
} catch(e) {
    console.log(e);
}

try {
    console.log(objUtils.flipObject({a:3, b:7, c: {x:1}, d: {y:3}, e: {z:7}}));
} catch(e) {
    console.log(e);
}

try {
    console.log(objUtils.flipObject({a:1, b:[1, 1, 2]}));
} catch(e) {
    console.log(e);
}