function computeObjects(array, func) {
    if(array === undefined)
        throw 'Array arguement is not provided in the function'
    if(array.length === 0)
        throw 'Empty Array of objects is provided, please provide array elements'
    if(typeof func !== 'function')
        throw 'The function parameter is not a type of Function'

    let finalObject = {};

    for(let i = 0; i < array.length; i++) {
        if(typeof array[i] !== 'object') 
            throw 'Parameters are not a type of Object'
        if(array[i] === null || array[i].length < 1)
            throw 'Given object is empty'
        if(Array.isArray(array[i]))
            throw 'Paramter is a type of Array which is not allowed'      
    }

    for(let i = 0; i < array.length; i++) { 
          for(let key in array[i]) {
              if(finalObject[key] != null) {
                  finalObject[key] += func(array[i][key]);
              } else {
                finalObject[key] = func(array[i][key]);;
              }
            }
    }            
    return finalObject;
}
    

function commonKeys(obj1, obj2) {
    if(typeof obj1 !== 'object' || typeof obj2 !== 'object') 
        throw 'Parameters are not a type of Object'
    let resultObject = {}
    for (let key in obj1) {
        if (obj1[key] === obj2[key]) {
            resultObject[key] = obj1[key];
        } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            resultObject[key] = commonKeys(obj1[key], obj2[key]);
        }
    }
    for(let key2 in resultObject) {
        if((Object.keys(obj1[key2]).length !== 0 && Object.keys(obj2[key2]).length !== 0) && Object.keys(resultObject[key2]).length === 0)
            delete resultObject[key2];
    }
    return resultObject;
}


function flipObject(object) {
    if(typeof object !== 'object') 
        throw 'Parameter is not a type of Object'
    if(Object.keys(object).length === 0)
        throw 'Object does not contain any Key Value Pair and length is zero'

    let flipObj = {};
        
    for (let key in object) {
        if(typeof object[key] === 'object') {
            if(Object.keys(object[key]).length === 0)
                throw 'Nested Object does not contain any Key Value Pair and length is zero'
            if(Array.isArray(object[key])) {
                for(let i = 0; i < object[key].length; i++) {
                    flipObj[object[key][i]] = key;        
                }
            } else {
                flipObj[key] = flipObject(object[key]);
            }
        } else {
            flipObj[object[key]] = key;
        }
    }
    return flipObj;
}

module.exports = {
    firstName: "Harshal",
    lastName: "Vaidya",
    studentId: "10468204",
    computeObjects,
    commonKeys,
    flipObject
};
