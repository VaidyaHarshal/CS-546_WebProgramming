function questionFour(num1, num2, num3) {
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
console.log(questionFour(1,3,2));
console.log(questionFour(2,5,6));
console.log(questionFour(0,0,1));
console.log(questionFour(11,2,11));
console.log(questionFour(1,0,1));