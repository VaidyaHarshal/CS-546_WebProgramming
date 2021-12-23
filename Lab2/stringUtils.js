function sortString(string) {
    if(string === undefined)     // Check for undefined parameter 
        throw 'Parameter does not exist';
    if(string.length < 1)        // Check for string length
        throw 'The length of the string is zero'
    if(typeof string !== 'string')  // Check for string type
        throw 'The string parameter is not of type String'
    if(string === " ")  // Check for empty spaces
        throw 'The string parameter contains only empty spaces'
    let tempString = [];
    let specialString = [];
    let numberString = [];
    let upperString = [];
    let lowerString = [];
    let combinedArray = [];
    let spaceString = [];
    let temp = [];

    for (i = 0; i < string.length; i++) {
        if(string[i] === " ") {
            spaceString[i] = string[i];
        }  else if 
            (/[0-9]/.test(string[i])) {
            numberString[i] = string[i];
          } else if 
            (/[A-Z]/.test(string[i])) {
                upperString[i] = string[i];
        } else if 
            (/[a-z]/.test(string[i])) {
                lowerString[i] = string[i];
        } else { 
        specialString[i] = string[i];
        }
    }
    specialString.sort();
    numberString.sort(function(a, b) {
        return a-b;
    });
    upperString.sort();
    lowerString.sort();
    spaceString.sort();  

    combinedArray = upperString.concat(lowerString,specialString,numberString,spaceString);
    for (i of combinedArray) {
        i && temp.push(i);          // Pushing non empty elements
    }
    combinedArray = temp;
    tempString = combinedArray.toString();
    
    finalString = tempString.replace(/,/g, '');
    return finalString;
}


function replaceChar(string, idx) {
    if(string === undefined)    // Check for undefined parameter
        throw 'Parameter does not exist';
    if(string.length < 1)       // Check for string length
        throw 'The length of the string is zero'
    if(typeof string !== 'string')  // Check for string type
        throw 'String parameter is not a String'
    if(string === " ")      // Check for empty spaces
        throw 'String contains only empty spaces'
    if(typeof idx !== 'number')     // Check for second parameter is a number
        throw 'Index parameter is not a number'
    if(idx <= 0 || idx > string.length - 2)     // Check for valid index parameter
        throw 'Index parameter passed is not valid'
    let tempVariable = string[idx];
    let tempString = '';
    let count = 0;                          // For alternate replacement of characters
    for(let i = 0; i < string.length; i++) {
        if(i === idx) {
            tempString = tempString + string[i];
            continue;
        } else if(string[i] !== tempVariable){
            tempString = tempString + string[i];
        } else if(string[i] === tempVariable && count % 2 === 0) {
            tempString = tempString + string[idx-1];        // Replace by previous index in array
            count++;
        } else if(string[i] === tempVariable && count % 2 !== 0) {
            tempString = tempString + string[idx+1];        // Replace by next index in array
            count++;
        }
    }
    return tempString;
}


function mashUp(string1, string2, char) {
    if(string1 === undefined || string2 === undefined || char === undefined)  // Check for undefined
        throw 'Parameter does not exist';
    if(typeof string1 !== 'string' || typeof string2 !== 'string' || typeof char !== 'string')  //Check for string type
        throw 'String parameter is not a type of String'
    if(string1 === " " && string2 === " " && char === " ")  // Check for empty spaces
        throw 'String paramter contains only empty spaces'
    let firstMashString = string1.split("");
    let secondMashString = string2.split("");
    let combinedString = '';
    
    // Check if i is less than the length of first string or second string
    for(let i = 0; i < firstMashString.length || i < secondMashString.length; i++) { 
        if(i < firstMashString.length) {  
            combinedString +=  firstMashString[i];    //if i is less than first string length then add a letter.
        } else {
            combinedString += char;  // else if i is greater than length then add padding character
        } 
        if(i < secondMashString.length) { 
            combinedString +=  secondMashString[i];   //if i is less than second string length then add a letter.
        } else {
            combinedString += char;   // else if i is greater than length then add padding character
            }
    }
    return combinedString;
}

module.exports = {
    firstName: "Harshal",
    lastName: "Vaidya",
    studentId: "10468204",
    sortString,
    replaceChar,
    mashUp
};
