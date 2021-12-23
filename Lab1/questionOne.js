function questionOne(arr) {
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
console.log(questionOne([5,3,10]));
console.log(questionOne([2]));
console.log(questionOne([]));
console.log(questionOne());
console.log(questionOne([1,0,0,0,0,0]));