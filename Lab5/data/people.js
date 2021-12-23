const axios = require("axios");

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}

let exportedMethods = {
    async getAllPeople() {
        if(arguments.length !== 0) 
            throw 'Arguements are passed to the function which is not allowed';

        const peopleData = await getPeople();
        return peopleData;
    },
    async getPeopleById(id) {
        if(!id)
            throw 'Please provide an ID to find the people';

        if(typeof id !== 'string')
            throw 'The type of ID is not a string';
            
        if(!id.trim().replace(/\s/g, "").length)
            throw 'The input ID parameter is just empty spaces';

        const peopleData = await getPeople();
        let resultData = {};

        for (let i = 0; i < peopleData.length; i++) {
            for(let key in peopleData[i]) {
                if(peopleData[i][key] === id) {
                    resultData = peopleData[i];
                    return resultData;
                }
            }
        }
        throw 'Id not found';
    }
};

module.exports = exportedMethods;