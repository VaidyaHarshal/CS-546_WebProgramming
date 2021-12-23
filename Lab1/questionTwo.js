function questionTwo(arr) {
    let uniqueArray = [];
    if(Array.isArray(arr) && arr.length !== 0 ) {
        uniqueArray = [...new Set(arr)];  // Eliminating duplicates
    }
    return uniqueArray;
}

console.log(questionTwo([1,1,1,1,1,1]));
console.log(questionTwo([1,'1',1,'1',2]));
console.log(questionTwo([3,'a','b',3,'1']));
console.log(questionTwo([]));
console.log(questionTwo());