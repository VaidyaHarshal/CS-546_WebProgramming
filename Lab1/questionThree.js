function questionThree(arr) {
    var anagObj = {}, finalAnagram = {}, uniqueObj = {};
    if(Array.isArray(arr) && arr.length !== 0 ) {
        for (var i in arr) {
            var word = arr[i];
            var sorted = word.split("").sort().join("");    //Sorting word

            if (anagObj[sorted] != null) {      // If key already exists
                anagObj[sorted].push(word);     // Push new word into array 
            } else {                            // If key does not exist
                anagObj[sorted] = [ word ];    // Insert key into object and create an array 
            }
        } 
        
        for(var item in anagObj) {   // Check for duplicate words in array
            uniqueObj[item] = anagObj[item].filter((data,index)=>{
                return anagObj[item].indexOf(data) === index;
            })
            if(uniqueObj[item].length >= 2) {   // Insert only unique words into object
                finalAnagram[item] = uniqueObj[item];
            }
        }
    }
    return finalAnagram;
}

console.log(questionThree(["cat","act","foo","bar"]));
console.log(questionThree(["race","care","foo","foo","foo"]));
console.log(questionThree(["foo","bar","test","Harshal","Vaidya"]));
console.log(questionThree([]));
console.log(questionThree(["miles","cat","lmise","tca","act","Harshal","arshalh","abc","acd"]));
console.log(questionThree(["play","alyp","play","play","lyap","tap","pta","tap","hi hello","lleoh ih"]));