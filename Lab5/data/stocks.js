const axios = require("axios");

async function getStocks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;  
}

let exportedMethods = {
    async getAllStocks() {
        if(arguments.length !== 0) 
            throw 'Arguements are passed to the function which is not allowed';
            
        stockData = await getStocks();
        return stockData;
    },
    async getStockById(id) {
        if(!id)
            throw 'Please provide an ID to find the stock'

        if(typeof id !== 'string')
            throw 'The type of ID is not a string'

        if(!id.trim().replace(/\s/g, "").length)
            throw 'The input ID contains only empty spaces'

        const stockData = await getStocks();
        let resultData = {};

        for (let i = 0; i < stockData.length; i++) {
            for(let key in stockData[i]) {
                if(stockData[i][key] === id) {
                    resultData = stockData[i];
                    return resultData;
                }
            }
        }
        throw 'Stock not found'
    }
};

module.exports = exportedMethods;