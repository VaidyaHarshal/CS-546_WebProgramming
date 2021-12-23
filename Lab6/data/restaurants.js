const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const { ObjectId } = require('mongodb');

let exportedMethods = {
    async get(id) {
        if (!id) 
            throw [400,"You must provide an id to search for"];

        if (typeof id !== 'string' || !id.trim().replace(/\s/g, "").length)
            throw [400,"Please provide a valid ID for the restaurant"];

        if(!ObjectId.isValid(id))
            throw [400,"The ID is not a valid Object ID"];

        console.log("Inside get Restaurant by ID");

        const restaurantCollection = await restaurants();
        const restro = await restaurantCollection.findOne({ _id: ObjectId(id) });

        if (restro === null)
            throw [404,"No restaurant with that id"];

        restro._id = restro._id.toString();
        return restro;
    },

    async getAll() {
        if(arguments.length > 0)
            throw [400,"Arguements are given to the function which is not allowed"];

        console.log("Inside get All Restaurants");
        const restaurantCollection = await restaurants();
        const restaurantList = await restaurantCollection.find({}, {projection: {_id: 1, name: 1}}).toArray();

        restaurantList.forEach(element => {
            element._id = element._id.toString();
        });

        return restaurantList;
    },

    async create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (!name || !location || !phoneNumber || !website || !priceRange || !cuisines || !serviceOptions)
            throw [400,"You must provide all valid inputs for your restaurant"];

        let phoneNo = /^\d{3}?(-)\d{3}(-)\d{4}$/;
        let pattern = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;

        if (typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || typeof website !== 'string' || typeof priceRange !== 'string')
            throw [400,"Please enter a valid string for your inputs"];

        if(!name.trim().replace(/\s/g, "").length || !location.trim().replace(/\s/g, "").length || !phoneNumber.trim().replace(/\s/g, "").length || !website.trim().replace(/\s/g, "").length || !priceRange.trim().replace(/\s/g, "").length)
            throw [400,"Only empty spaces in the strings are not allowed"];

        if(!phoneNo.test(phoneNumber))
            throw [400,"Phone number does not follow proper format"];

        if(!pattern.test(website) || website.length < 20)
            throw [400,"The provided URL is not valid. Please provide another URL"];

        if(priceRange.length > 4 || (priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$'))
            throw [400,"Price range given is not valid. Please enter a valid Price range"];

        if (Array.isArray(cuisines)) {
            cuisines.forEach(element => {
                if( !element || typeof element != 'string' || !element.trim().toString().replace(/\s/g, "").length)
                    throw [400,"Please provide proper array of cuisines"];
            });
        } 
        else
            throw [400,"You must provide an array of cuisines"];
      
        if (typeof serviceOptions !== 'object') 
            throw [400,"Service options should be an object"];

        if(!serviceOptions.hasOwnProperty('dineIn') || !serviceOptions.hasOwnProperty('takeOut') || !serviceOptions.hasOwnProperty('delivery'))
            throw [400,"Trying to insert wrong key. Please enter valid key"];

        if(typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || typeof serviceOptions.delivery !== 'boolean')
            throw [400,"The object keys should be boolean. Please check"];

        console.log("In the create of Restaurant");
        const restaurantCollection = await restaurants();

        let newRestaurant = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: 0,
            serviceOptions: serviceOptions,
            reviews: []
        };

        const insertInfo = await restaurantCollection.insertOne(newRestaurant);
        if (insertInfo.insertedCount === 0) 
            throw [400,"Could not add new restaurant"];;

        const newId = insertInfo.insertedId;

        const restaurant = await this.get(newId.toString());
        return restaurant;
    },

    async remove(id) {
        if (!id)
            throw [400,"You must provide an id to search for"];

        if(typeof id !== 'string' || !id.replace(/\s/g, "").length)
            throw [400,"Please provide a valid ID for removal of restaurant"];

        if(!ObjectId.isValid(id))
            throw [400,"The ID is not a valid Object ID"];

        let resultData = {};
        console.log("In the delete of Restaurant");
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: ObjectId(id) });

        if (restaurant === null)
            throw [404,"No restaurant present with that id to delete"];

        const deletionInfo = await restaurantCollection.deleteOne({ _id: ObjectId(id) });

        if(deletionInfo.deletedCount === 0) { 
            throw [400,"Could not delete restaurant"];
        }

        resultData = {"restaurantId": id, "deleted": true};
        return resultData;
    },

    async update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (!id || !name || !location || !phoneNumber || !website || !priceRange || !cuisines || !serviceOptions)
            throw [400,"You must provide all valid inputs for your restaurant"];

        let phoneNo = /^\d{3}?(-)\d{3}(-)\d{4}$/;
        let pattern = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;

        if (typeof id !== 'string' || typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || typeof website !== 'string' || typeof priceRange !== 'string')
            throw [400,"please enter a valid string for your inputs"];

        if(!id.trim().replace(/\s/g, "").length || !name.trim().replace(/\s/g, "").length || !location.trim().replace(/\s/g, "").length || !phoneNumber.trim().replace(/\s/g, "").length || !website.trim().replace(/\s/g, "").length || !priceRange.trim().replace(/\s/g, "").length)
            throw [400,"Only empty spaces in the strings are not allowed"];

        if(!ObjectId.isValid(id))
            throw [400,"The ID is not a valid Object ID"];

        if(!phoneNo.test(phoneNumber))
            throw [400,"Phone number does not follow proper format"];

        if(!pattern.test(website) || website.length < 20)
            throw [400,"The provided URL is not valid. Please provide another URL"];

        if(priceRange.length > 4 || (priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$'))
            throw [400,"Price range given is not valid. Please enter a valid Price range"];

        if (Array.isArray(cuisines)) {
            cuisines.forEach(element => {
                if( !element || typeof element != 'string' || !element.trim().toString().replace(/\s/g, "").length)
                    throw [400,"Please provide proper array of cuisines"];
            });
        } 
        else
            throw [400,"You must provide an array of cuisines"];
    
        if (typeof serviceOptions !== 'object') 
            throw [400,"Service options should be an object"];

        if(!serviceOptions.hasOwnProperty('dineIn') || !serviceOptions.hasOwnProperty('takeOut') || !serviceOptions.hasOwnProperty('delivery'))
            throw [400,"Trying to insert wrong key. Please enter valid key"];

        if(typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || typeof serviceOptions.delivery !== 'boolean')
            throw [400,"The object keys should be boolean. Please check"];

        const restaurantCollection = await restaurants();
        const findRestro = await restaurantCollection.findOne({_id: ObjectId(id)});

        if(findRestro === null)
            throw [404,"Restaurant does not exist"];

        let restaurantUpdateInfo = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: findRestro.overallRating,
            serviceOptions: serviceOptions,
            reviews: findRestro.reviews
        };

        console.log("In the update of Restaurant");
        const updateRestaurant = await restaurantCollection.updateOne(
            {_id: ObjectId(id)},
            {$set: restaurantUpdateInfo}
        );

        if(!updateRestaurant.matchedCount && !updateRestaurant.modifiedCount)
            throw [400,"Update has been failed"];

        if(!updateRestaurant.modifiedCount)
            throw [400,"Same values has been provided for update. Please change the values"];

        return await this.get(id);
    }
};

module.exports = exportedMethods;