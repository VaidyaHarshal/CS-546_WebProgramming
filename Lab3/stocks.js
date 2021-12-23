const axios = require("axios");
const { firstName, lastName } = require("./people");

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}

async function getStocks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;  
}

async function listShareholders() {
    if(arguments.length > 0)
        throw 'Arguements are given to the fuction which is not allowed'

    let peopleData = [];
    let stocksData = [];

    peopleData = await getPeople();
    stocksData = await getStocks();

    stocksData.forEach(element => {
        element.shareholders.forEach( data => {
            peopleData.forEach(temp => {
                if(data.userId === temp.id) {
                    data.first_name = temp.first_name;
                    data.last_name = temp.last_name;
                    delete data.userId;
                }
            });
        });
    });
    return stocksData;
}

async function topShareholder(stockName) {
    if(stockName === undefined)
        throw 'The input parameter stock name is missing'
    
    stockName = stockName.trim();

    if(typeof stockName !== 'string')
        throw 'The type of stock name is not a string'
    if(!stockName.replace(/\s/g, "").length)
        throw 'The input stock name contains only empty spaces'

    let stockData = [];
    let tempFname = '';
    let tempLname = '';
    let tempUserId = '';
    let maxValue = 0, count = 0;

    peopleData = await getPeople();
    stockData = await getStocks();
    
    stockData.forEach(element => {
        if(element.stock_name === stockName) {
            count++;
            if(element.shareholders.length <= 0)
                return stockName + ' currently has no shareholders';
            maxValue = element.shareholders.reduce((a, b) => a.number_of_shares > b.number_of_shares ? a : b).number_of_shares;
            element.shareholders.forEach( data => {
                if(data.number_of_shares === maxValue) {
                    tempUserId = data.userId;
                }
            });
        }
    });

    if(count === 0)
        throw 'Error as no stock is present with the given name';

    for(i = 0; i < peopleData.length; i++) {
        if(peopleData[i].id === tempUserId) {
            tempFname = peopleData[i].first_name;
            tempLname = peopleData[i].last_name;
        }
    }

    if(maxValue === 0) {
        finalString =  stockName + ' currently has no shareholders.'
    } else {
    finalString = 'With ' + maxValue + ' shares in ' + stockName + ', ' + tempFname + ' ' + tempLname + ' is the top share holder.';
    }

    return finalString;
}


async function listStocks(firstName, lastName) {
    if(firstName === undefined || lastName === undefined)
        throw 'The input ID does not exist'

    firstName = firstName.trim();
    lastName = lastName.trim();

    if(typeof firstName !== 'string' || typeof lastName !== 'string')
        throw 'The type of ID is not a string'

    if(!firstName.replace(/\s/g, "").length || !lastName.replace(/\s/g, "").length)
        throw 'The input first name or last name contains only empty spaces'

    let stockData = [];
    let resultId = [];
    let resultData = [];
    let count = 0, cnt = 0;
        
    peopleData = await getPeople();
    stockData = await getStocks();

    for(let i = 0; i < peopleData.length; i++) {
        if(peopleData[i].first_name === firstName && peopleData[i].last_name === lastName) {
            resultId[count] = peopleData[i].id;
            count++;
        }
    }

    if(resultId.length === 0)
        throw 'Error because ' + firstName + " " + lastName + ' is not in people.json'

    for (i = 0; i < stockData.length; i++) {
        stockData[i].shareholders.forEach(element => {
            resultId.forEach(data => {
                if(element.userId === data) {
                    resultData[cnt] = {"stock_name": stockData[i].stock_name, "number_of_shares":element.number_of_shares};
                    cnt++
                }
            });
        });
    }
    if(resultData.length === 0) {
        throw 'There are no stocks present for given person'
    }
    else
    return resultData;
}


async function getStockById(id) {
    if(id === undefined)
        throw 'The input ID does not exist'

    id = id.trim();

    if(typeof id !== 'string')
        throw 'The type of ID is not a string'

    if(!id.replace(/\s/g, "").length)
        throw 'The input ID contains only empty spaces'

    let stockData = [];
    let resultData = {};
    
    stockData = await getStocks();

    for (let i = 0; i < stockData.length; i++) {
        for(let key in stockData[i]) {
            if(stockData[i][key] === id) {
                resultData = stockData[i];
                return resultData;
            }
        }
    }
    throw 'Stock not found';
}

module.exports = {
    firstName: "Harshal",
    lastName: "Vaidya",
    studentId: "10468204",
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
}