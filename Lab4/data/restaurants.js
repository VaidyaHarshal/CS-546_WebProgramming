const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const { ObjectId } = require('mongodb');

let exportedMethods = {
  async get(id) {
    if (!id) 
      throw 'You must provide an id to search for';

    if (typeof id !== 'string' || !id.trim().replace(/\s/g, "").length)
      throw 'Please provide a valid ID for the restaurant'

    if(!ObjectId.isValid(id))
      throw 'The ID is not a valid Object ID';

    const restaurantCollection = await restaurants();
    const restro = await restaurantCollection.findOne({ _id: ObjectId(id) });

    if (restro === null)
      throw 'No restaurant with that id';

    restro._id = restro._id.toString();
    return restro;
  },

  async getAll() {
    if(arguments.length > 0)
      throw 'Arguements are given to the fuction which is not allowed'

    const restaurantCollection = await restaurants();

    const restaurantList = await restaurantCollection.find({}).toArray();

    restaurantList.forEach(element => {
      element._id = element._id.toString();
    });

    return restaurantList;
  },

  async create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions) {
    if (!name || !location || !phoneNumber || !website || !priceRange || !cuisines || !overallRating || !serviceOptions)
      throw 'You must provide all valid inputs for your restaurant';

    let phoneNo = /^\d{3}?(-)\d{3}(-)\d{4}$/;
    let pattern = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;

    if (typeof name != 'string' || typeof location != 'string' || typeof phoneNumber != 'string' || typeof website != 'string' || typeof priceRange != 'string')
      throw 'please enter a valid string for your inputs';

    if(!name.trim().replace(/\s/g, "").length || !location.trim().replace(/\s/g, "").length || !phoneNumber.trim().replace(/\s/g, "").length || !website.trim().replace(/\s/g, "").length || !priceRange.trim().replace(/\s/g, "").length)
      throw 'Only empty spaces in the strings are not allowed'

    if(!phoneNo.test(phoneNumber))
      throw 'Phone number does not follow proper format'

    if(!pattern.test(website) || website.length < 20)
      throw 'The provided URL is not valid. Please provide another URL'

    if(priceRange.length > 4 || (priceRange !== '$' && priceRange !== '$$' && priceRange !== '$$$' && priceRange !== '$$$$'))
      throw 'Price range given is not valid. Please enter a valid Price range'

    if (Array.isArray(cuisines)) {
      cuisines.forEach(element => {
        if( !element || typeof element != 'string' || !element.trim().toString().replace(/\s/g, "").length)
          throw 'Please provide proper array of cuisines'
      });
    } 
    else
      throw 'You must provide an array of cuisines';

    if(typeof overallRating !== 'number' || overallRating < 0 || overallRating > 5)
      throw 'Overall rating is not valid. Please provide a valid rating'
      
    if (typeof serviceOptions !== 'object') 
      throw 'Service options should be an object';

    if(!serviceOptions.hasOwnProperty('dineIn') || !serviceOptions.hasOwnProperty('takeOut') || !serviceOptions.hasOwnProperty('delivery'))
      throw 'Trying to insert wrong key. Please enter valid key'

    if(typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || typeof serviceOptions.delivery !== 'boolean')
      throw 'The object keys should be boolean. Please check'

    const restaurantCollection = await restaurants();

    const sameRestro = await restaurantCollection.findOne({ name: name, location: location, phoneNumber: phoneNumber });
    
    if (sameRestro !== null)
      throw 'Restaurant you are trying to add already exists. Please change Name, Location or Phone number of the restaurant';

    let newRestaurant = {
      name: name,
      location: location,
      phoneNumber: phoneNumber,
      website: website,
      priceRange: priceRange,
      cuisines: cuisines,
      overallRating: overallRating,
      serviceOptions: serviceOptions
    };

    const insertInfo = await restaurantCollection.insertOne(newRestaurant);
    if (insertInfo.insertedCount === 0) 
      throw 'Could not add new restaurant';

    const newId = insertInfo.insertedId;

    const restaurant = await this.get(newId.toString());
    return restaurant;
  },

  async remove(id) {
    if (!id)
      throw 'You must provide an id to search for';

    if(typeof id !== 'string' || !id.replace(/\s/g, "").length)
      throw 'Please provide a valid ID for removal of restaurant';

    if(!ObjectId.isValid(id))
      throw 'The ID is not a valid Object ID';

    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: ObjectId(id) });

    if (restaurant === null)
      throw 'No restaurant present with that id to delete';

    const deletionInfo = await restaurantCollection.deleteOne({ _id: ObjectId(id) });

    if(deletionInfo.deletedCount === 0) { 
      throw `Could not delete restaurant with id of ${id}`;
    }
    return `${restaurant.name} has been successfully deleted!`;
  },

  async rename(id, newWebsite) {
    if (!id) 
      throw 'You must provide an id to search for';

    if (!newWebsite) 
      throw 'You must provide a name for your website';

    if (typeof id != 'string' || !id.trim().replace(/\s/g, "").length)
      throw 'Please provide a valid ID for the restaurant'

    if(!ObjectId.isValid(id))
      throw 'The ID is not a valid Object ID'

    let pattern = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;

    if (typeof newWebsite !== 'string' || !pattern.test(newWebsite.trim()))
      throw 'please enter a valid input for your new website';

    let tempUrl = newWebsite.toLowerCase();

    const restaurantCollection = await restaurants();

    const restaurant = await restaurantCollection.findOne({ _id: ObjectId(id) });

    if (restaurant === null)
      throw 'No restaurant present with that id to update';

    if(restaurant.website.toLowerCase() === tempUrl)
      throw 'The new URL provided is same as the old one';

    const updatedRestaurant = {
      website: newWebsite
    };

    const updatedInfo = await restaurantCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedRestaurant }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update restaurant successfully';
    }
    return await this.get(id);
  }
};