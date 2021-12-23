const axios = require("axios");

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}

async  function getPersonById(id) {
    if(id === undefined)
        throw 'The input ID does not exist'

    id = id.trim();

    if(typeof id !== 'string')
        throw 'The type of ID is not a string'
    if(!id.replace(/\s/g, "").length)
        throw 'The input ID parameter is just empty spaces'
    
    let peopleData = [];
    let resultData = {};
    peopleData = await getPeople();

    for (let i = 0; i < peopleData.length; i++) {
        for(let key in peopleData[i]) {
            if(peopleData[i][key] === id) {
                resultData = peopleData[i];
                return resultData;
            }
        }
    }
    throw 'Person not found';
}

async function sameStreet(streetName, streetSuffix) {    
    if(streetName === undefined || streetSuffix === undefined)
        throw 'The input streetName or streetSuffix does not exist'

    streetName = streetName.trim();
    streetSuffix = streetSuffix.trim();

    if(typeof streetName !== 'string' || typeof streetSuffix !== 'string')
        throw 'The type of streetName or streetSuffix is not a string'
    if(!streetName.replace(/\s/g, "").length || !streetSuffix.replace(/\s/g, "").length)
        throw 'The input ID parameter is just empty spaces'

    let arrayPeople = [];
    let resultPeople = [];
    let count = 0;

    arrayPeople = await getPeople();

    let mappedObject = arrayPeople.map(function(a) {
        a.address.home.street_name = a.address.home.street_name.toLowerCase();
        a.address.home.street_suffix = a.address.home.street_suffix.toLowerCase();
        a.address.work.street_name = a.address.work.street_name.toLowerCase();
        a.address.work.street_suffix = a.address.work.street_suffix.toLowerCase();
        return a;
    })

    for (let i = 0; i < arrayPeople.length; i++) {        
        if((mappedObject[i].address.home.street_name === streetName.toLowerCase() && mappedObject[i].address.home.street_suffix === streetSuffix.toLowerCase()) || (mappedObject[i].address.work.street_name === streetName.toLowerCase()  && mappedObject[i].address.work.street_suffix === streetSuffix.toLowerCase())) {
            resultPeople[count] = arrayPeople[i];
            count++;
        }
    }

    if(resultPeople.length > 2)
        return resultPeople;
    else
        throw 'There are not atleast two people that live or work on given location'
}

async function manipulateSsn() {
    if(arguments.length > 0)
        throw 'Arguements are given to the fuction which is not allowed'
    let ssnData = [];
    let sortedArray = [];
    let resultObject = {};
    let totalSum = 0, totalAverage = 0;

    generalData = await getPeople();

    for (let i = 0; i < generalData.length; i++) {
        ssnData[i] = generalData[i].ssn;
        ssnData[i] = ssnData[i].replace(/-/g, "");
        sortedArray[i] = ssnData[i].split("").sort().join('');
        sortedArray[i] = parseInt(sortedArray[i]);
    }

    let highest = Math.max(...sortedArray);
    let lowest = Math.min(...sortedArray);

    for(i = 0; i < sortedArray.length; i++) {
        if(sortedArray[i] === highest) {
            resultObject['highest'] = {"firstName": generalData[i].first_name, "lastName": generalData[i].last_name};
        }
        if(sortedArray[i] === lowest) {
            resultObject['lowest'] = {"firstName": generalData[i].first_name, "lastName": generalData[i].last_name};
        }
        totalSum += sortedArray[i];        
    } 
    totalAverage = Math.floor(totalSum/sortedArray.length);
    resultObject['average'] = totalAverage;
    return resultObject;
}

async function sameBirthday(month, day) {
    if(month === undefined || day === undefined)
        throw 'The input Month or Day is not given';

    if(typeof month === 'string') {
        month = month.trim();
        if(!month.replace(/\s/g, "").length)
            throw 'The input month contains only empty spaces'
        month = parseInt(month);
        if(typeof month !== 'number')
            throw 'The given month is not a number';
    }

    if(typeof day === 'string') {
        day = day.trim();
        if(!day.replace(/\s/g, "").length)
            throw 'The input day contains only empty spaces'
        day = parseInt(day);
        if(typeof day !== 'number')
            throw 'The given month is not a number';
    }
    
    if(typeof month !== 'number' || typeof day !== 'number')
        throw 'Please pass a valid number for Month or day';

    if(month < 1 || month > 12)
        throw 'The given month is not a valid month. Please enter valid month';

    if(month === 2 && day >= 29) 
        throw 'The month february does not have ' + day + ' days';
    else if(month === 8 && day > 31)
        throw 'The month August does not have ' + day + ' days';
    else if(((month === 4 || month === 6 || month === 9 || month === 11) && day > 30))
        throw 'Please enter a valid date for the entered month'
    else if((month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) && day > 31)
        throw 'The date which is entered for the given month does not exist. Please check'

    let dateOfBirth = [];
    let resultData = [];
    let count = 0;

    generalData = await getPeople();

    for(let i = 0; i < generalData.length; i++) {
        dateOfBirth[i] = generalData[i].date_of_birth;
         dateOfBirth[i] = dateOfBirth[i].replace(/\//g, "");
         dateOfBirth[i] = (dateOfBirth[i].substring(0,4));
        //  sortedArray[i] = dateOfBirth[i].split("").sort().join('');
         dateOfBirth[i] = parseInt(dateOfBirth[i]);
    }

    for(i = 0; i < dateOfBirth.length; i++) {
        if((parseInt(month + '' + day)) === dateOfBirth[i]) {
        resultData[count] = generalData[i].first_name + ' ' + generalData[i].last_name;
        count++;
        }
    }
    if(resultData.length > 0)
        return resultData;
    else
        throw 'There are no birthdays for the given date';
}

module.exports = {
    firstName: "Harshal",
    lastName: "Vaidya",
    studentID: "10468204",
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday
}