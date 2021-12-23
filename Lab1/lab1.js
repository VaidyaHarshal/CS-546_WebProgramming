const questionOne = function questionOne(arr) {
    let myPrimeObj = {};

    if(Array.isArray(arr) && arr.length !== 0 ) {
        arr.forEach(element => {
        resultNumber = Math.pow(element,2) - 7; // Calculating using given formula
        primeNumber = Math.abs(resultNumber);   // Calculating absolute value

        if(primeNumber === 2) {
            myPrimeObj[primeNumber] = true;
        } else if (primeNumber > 1) {
            for (let i = 2; i < primeNumber; i++) {
                if (primeNumber % i === 0) {            // If number is divisible
                    myPrimeObj[primeNumber] = false;    // It is not a prime number
                    break;
                } else {
                    myPrimeObj[primeNumber] = true;     // It is a prime number
                }
            }
        } else {
            myPrimeObj[primeNumber] = false;
        }
});}
    return myPrimeObj;
}

const questionTwo = function questiontwo(arr) {
    let uniqueArray = [];
    if(Array.isArray(arr) && arr.length !== 0 ) {
        uniqueArray = [...new Set(arr)];  // Eliminating duplicates
    }
    return uniqueArray;
}

const questionThree = function questionThree(arr) {
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

const questionFour = function questionFour(num1, num2, num3) {
    let avgNum = 0, tempFactorial = 0, finalNum = 0;
    function calFactorial(num) {
        if(num === 0) {
            return 1;
        }
        return num * calFactorial(num - 1);  // Calculate factorial using recurssion
    }
    tempFactorial = calFactorial(num1) + calFactorial(num2) + calFactorial(num3);
    avgNum = (num1 + num2 + num3)/3;   // Average of the original inputs
    finalNum = Math.floor(tempFactorial/avgNum);  // Calculating required value
    return finalNum;
}

module.exports = {
    firstName: "Harshal",
    lastName: "Vaidya",
    studentId: "10468204",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};