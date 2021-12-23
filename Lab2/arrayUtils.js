function average(arr) {
    if(arr === undefined)  // Check for undefined 
        throw 'Parameter does not exist';
    if(!Array.isArray(arr))     // Check if the parameter is an array
        throw 'Its not an Array, Please pass an Array';
    if(arr.length === 0)  // Check for array length
        throw 'Given array is Empty';

    let tempAvg = 0, 
    roundedAverage = 0, 
    tempLength = 0;

    for(let i = 0; i < arr.length; i++){
        if(!Array.isArray(arr[i]))      // Check for nested array elements
            throw 'Array elements are not an Array';
        if(arr[i].length === 0)   // Check for nested empty array
            throw 'Array is Empty';
        tempLength += arr[i].length;
        for(let j = 0; j < arr[i].length; j++){
            if(typeof arr[i][j] !== "number")   // Check for if only numbers are present
                throw 'Only numbers are allowed in the array';
            tempAvg += (arr[i][j]);
        }
    }
    roundedAverage = Math.round(tempAvg/tempLength);
    return roundedAverage;
}


function modeSquared(arr) {
    if(arr === undefined)       // Check for undefined 
        throw 'Parameter does not exist';
    if(!Array.isArray(arr))     // Check for if the parameter is an array 
        throw 'Its not an Array, Please pass an Array';
    if(arr.length === 0)        // Check for empty array
        throw 'Given Array is Empty';

    let modeArray = [];
    let countArray = [];
    let tempNumber = 0; maxCount = 0, modeAvg = 0;

    for (let i = 0; i < arr.length; i++) {
        if(typeof arr[i] !== "number")  // Check for only numbers 
            throw 'Only numbers are allowed in the array';
        tempNumber = arr[i];
        countArray[tempNumber] = (countArray[tempNumber] || 0) + 1;
        if (countArray[tempNumber] > maxCount) {
            maxCount = countArray[tempNumber];
        }
    }

    for (i in countArray) {
        if(countArray.hasOwnProperty(i)) {
            if(countArray[i] === maxCount) {
                modeArray.push(Number(i));
            }
        }
    }
    for (i = 0; i < modeArray.length; i++) {
        if(arr.length === modeArray.length) {       // No Mode is present, hence Mode is zero
            return 0
        } else {
        modeAvg += Math.pow(modeArray[i],2);
        }
    }
    return modeAvg;
}


function medianElement(array){
    if(array === undefined) 
        throw 'Parameter does not exist';
    if(!Array.isArray(array)) 
        throw 'Its not an Array, Please pass an Array';
    if(array.length === 0) 
        throw 'No inputs are passed';
        
    let medianObject = {};
    let tempVar = 0;
 
    for(let i = 0; i < array.length; i++) {
        if(typeof array[i] !== "number") 
            throw 'Only numbers are allowed in the array';        
    }
    
    let sortedArray = [...array];  
    sortedArray.sort(function(a,b){
      return a-b;
    });
  
    let indexVariable = Math.floor(sortedArray.length / 2);
    
    if (sortedArray.length % 2 == 0) {
        tempVar = (sortedArray[indexVariable - 1] + sortedArray[indexVariable]) / 2.0;
        if(array.indexOf(sortedArray[indexVariable - 1]) < array.indexOf(sortedArray[indexVariable]))
            medianObject[tempVar] = array.indexOf(sortedArray[indexVariable]);
        else
            medianObject[tempVar] = array.indexOf(sortedArray[indexVariable - 1]);
        return medianObject;
    }
    medianObject[sortedArray[indexVariable]] = array.indexOf(sortedArray[indexVariable]);
    return medianObject;
}


function merge(arrayOne,arrayTwo){
    if(arrayOne === undefined || arrayTwo === undefined ) 
        throw 'Parameter for Array does not exist';
    if(!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) 
        throw 'Not an Array, Please pass an Array';
    if(arrayOne.length === 0 || arrayTwo.length === 0) 
        throw 'No inputs are passed in the Array';
    
    for(let i = 0; i < arrayOne.length; i++) {
        if(typeof arrayOne[i] !== "number" && typeof arrayOne[i] !== "string") 
            throw 'Only numbers and char string are allowed in the first array';
        if(typeof arrayOne[i] === "string" && arrayOne[i].length > 1)
            throw 'Only Characters are allowed in the first array for string'
    }
    for(let j = 0; j < arrayTwo[j].length; j++) {
        if(typeof arrayTwo[j] !== "number" && typeof arrayTwo[j] !== "string") 
            throw 'Only numbers and char string are allowed in the second array';
        if(typeof arrayTwo[j] === "string" && arrayTwo[j].length > 1)
            throw 'Only Characters are allowed in the second array for string'
    }        

    let numberVar = [];
    let lowerChar = [];
    let upperChar = [];
    let mixedArray = [];
    let temp = [];

	for(let i = 0; i < arrayTwo.length; i++) {
		arrayOne.push(arrayTwo[i]);
	}
    
    arrayOne.sort(function(a,b){
        return a-b;
    });

    for (i = 0; i < arrayOne.length; i++) {
        if (/[0-9]/.test(arrayOne[i])) {
            numberVar[i] = arrayOne[i];
        } else if (/[A-Z]/.test(arrayOne[i])) {
            upperChar[i] = arrayOne[i];
        } else if (/[a-z]/.test(arrayOne[i])) {
            lowerChar[i] = arrayOne[i];
        }
    }
    mixedArray = lowerChar.concat(upperChar,numberVar);

    for (i of mixedArray) {
        i && temp.push(i);          // Pushing non empty elements
    }

    mixedArray = temp;
    return mixedArray;
}

module.exports = {
    firstName: "Harshal",
    lastName: "Vaidya",
    studentId: "10468204",
    average,
    modeSquared,
    medianElement,
    merge
};