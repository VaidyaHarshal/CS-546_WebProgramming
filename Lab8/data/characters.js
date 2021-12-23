const axios = require("axios")
const md5 = require('blueimp-md5');
const publickey = '94dce821bcc69c8477eae0f5f7e93282';
const privatekey = 'c7b613766b1bd35402222ad08ff78df0e8739617';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

const exportedMethods = {
    async getAllChars(){
        const { data }= await axios.get(url);
        return data;
    },
    
    async getCharacter(searchTerm) {
        if(!searchTerm)
            throw 'You must provide a name to search for the hero';

        if (typeof searchTerm !== 'string' || !searchTerm.trim().replace(/\s/g, "").length)
            throw 'Please provide a valid term for searching the hero';

        const searchUrl = baseUrl + '?nameStartsWith=' + searchTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data } = await axios.get(searchUrl);
        if(!data)
            throw 'No hero found for the searched name';

        return data.data.results.slice(0,20);
    },
    async getById(id) {
        if (!id) 
            throw 'You must provide an id to search for the hero';

        if (typeof id !== 'string' || !id.trim().replace(/\s/g, "").length)
            throw 'Please provide a valid ID for the hero';

        const idUrl = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data } = await axios.get(idUrl);
        if(!data)
            throw 'No hero found for the given ID';
        return data;
    }
}

module.exports = exportedMethods;