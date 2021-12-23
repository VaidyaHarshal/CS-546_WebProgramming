const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData = data.restaurants;
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
      const restaurantList = await restaurantData.getAll();
      res.json(restaurantList);
    } catch (e) {
      res.status(404).json({ error: 'No restaurants are found' });
    }
  });

router.post('/', async (req, res) => {
  let restaurantInfo = req.body;
 
  if (!restaurantInfo) {
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  
  if (!restaurantInfo.name) {
    res.status(400).json({ error: 'You must provide a restaurant name' });
    return;
  }
  
  if (!restaurantInfo.location) {
    res.status(400).json({ error: 'You must provide a restaurant location' });
    return;
  }

  if (!restaurantInfo.phoneNumber) {
    res.status(400).json({ error: 'You must provide a restaurant phone number' });
    return;
  }
    
  if (!restaurantInfo.website) {
    res.status(400).json({ error: 'You must provide a restaurant website' });
    return;
  }

  if (!restaurantInfo.priceRange) {
    res.status(400).json({ error: 'You must provide a restaurant price range' });
    return;
  }
    
  if (!restaurantInfo.cuisines) {
    res.status(400).json({ error: 'You must provide restaurant cuisines' });
    return;
  }

  if (!restaurantInfo.serviceOptions) {
    res.status(400).json({ error: 'You must provide restaurant serviceOptions' });
    return;
  }

  if (typeof restaurantInfo.name !== 'string' || typeof restaurantInfo.location !== 'string' || typeof restaurantInfo.phoneNumber !== 'string' || typeof restaurantInfo.website !== 'string' || typeof restaurantInfo.priceRange !== 'string') {
    res.status(400).json({ error: 'Please enter valid strings for your inputs' });
    return;
  }

  if(!restaurantInfo.name.trim().replace(/\s/g, "").length || !restaurantInfo.location.trim().replace(/\s/g, "").length || !restaurantInfo.phoneNumber.trim().replace(/\s/g, "").length || !restaurantInfo.website.trim().replace(/\s/g, "").length || !restaurantInfo.priceRange.trim().replace(/\s/g, "").length){
    res.status(400).json({ error: 'Please enter valid strings for your inputs and not just empty spaces' });
    return;
  }

  let phoneNo = /^\d{3}?(-)\d{3}(-)\d{4}$/;
  let pattern = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;

  if(!phoneNo.test(restaurantInfo.phoneNumber)) {
    res.status(400).json({ error: 'Phone number does not follow proper format' });
    return;
  }

  if(!pattern.test(restaurantInfo.website) || restaurantInfo.website.length < 20) {
    res.status(400).json({ error: 'The provided URL is not valid as per requirements. Please provide another URL' });
    return;
  }

  if(restaurantInfo.priceRange.length > 4 || (restaurantInfo.priceRange !== '$' && restaurantInfo.priceRange !== '$$' && restaurantInfo.priceRange !== '$$$' && restaurantInfo.priceRange !== '$$$$')) {
    res.status(400).json({ error: 'Price range given is not valid. Please enter a valid Price range' });
    return;
  }

  if (Array.isArray(restaurantInfo.cuisines)) {
    restaurantInfo.cuisines.forEach(element => {
        if( !element || typeof element != 'string' || !element.trim().toString().replace(/\s/g, "").length) {
          res.status(400).json({ error: 'Please provide proper array of cuisines' });
          return;
        }
    });
  } 
  else {
    res.status(400).json({ error: 'You must provide an array of cuisines' });
    return;
  }

  if (typeof restaurantInfo.serviceOptions !== 'object') {
    res.status(400).json({ error: 'Service options should be an object' });
    return;
  }

  if(!restaurantInfo.serviceOptions.hasOwnProperty('dineIn') || !restaurantInfo.serviceOptions.hasOwnProperty('takeOut') || !restaurantInfo.serviceOptions.hasOwnProperty('delivery')) {
    res.status(400).json({ error: 'Trying to insert wrong key. Please enter valid key' });
    return;
  }

  if(typeof restaurantInfo.serviceOptions.dineIn !== 'boolean' || typeof restaurantInfo.serviceOptions.takeOut !== 'boolean' || typeof restaurantInfo.serviceOptions.delivery !== 'boolean') {
    res.status(400).json({ error: 'The object keys should be boolean. Please check' });
    return;
  }

  try {
    const newRestaurant = await restaurantData.create(
      restaurantInfo.name,
      restaurantInfo.location,
      restaurantInfo.phoneNumber,
      restaurantInfo.website,
      restaurantInfo.priceRange,
      restaurantInfo.cuisines,
      restaurantInfo.serviceOptions
    );

    res.json(newRestaurant);
  } catch (e) {
    res.status(400).json({ error: 'There is an error while creating restaurant, please check your values again' });
    }
});

router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must provide an ID' });
    return;
  }

  if (!req.params.id.trim().replace(/\s/g, "").length) {
    res.status(400).json({ error: 'ID provided only contains blank spaces' });
    return;
  }

  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'The ID is not a valid Object ID' });
    return;
  }

  try {
    let restaurant = await restaurantData.get(req.params.id);
    res.json(restaurant);
  } catch (e) {
    res.status(404).json({ error: 'Restaurant not found' });
  }
});

router.put('/:id', async (req, res) => {
  let restaurantInfo = req.body;

  if (!restaurantInfo) {
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  
  if (!restaurantInfo.name) {
    res.status(400).json({ error: 'You must provide a restaurant name' });
    return;
  }
    
  if (!restaurantInfo.location) {
    res.status(400).json({ error: 'You must provide a restaurant location' });
    return;
  }
  
  if (!restaurantInfo.phoneNumber) {
    res.status(400).json({ error: 'You must provide a restaurant phone number' });
    return;
  }
     
  if (!restaurantInfo.website) {
    res.status(400).json({ error: 'You must provide a restaurant website' });
    return;
  }
  
  if (!restaurantInfo.priceRange) {
    res.status(400).json({ error: 'You must provide a restaurant price range' });
    return;
  }
      
  if (!restaurantInfo.cuisines) {
    res.status(400).json({ error: 'You must provide restaurant cuisines' });
    return;
  }
  
  if (!restaurantInfo.serviceOptions) {
    res.status(400).json({ error: 'You must provide restaurant serviceOptions' });
    return;
  }

  if (typeof restaurantInfo.name !== 'string' || typeof restaurantInfo.location !== 'string' || typeof restaurantInfo.phoneNumber !== 'string' || typeof restaurantInfo.website !== 'string' || typeof restaurantInfo.priceRange !== 'string') {
    res.status(400).json({ error: 'Please enter valid strings for your inputs' });
    return;
  }

  if(!restaurantInfo.name.trim().replace(/\s/g, "").length || !restaurantInfo.location.trim().replace(/\s/g, "").length || !restaurantInfo.phoneNumber.trim().replace(/\s/g, "").length || !restaurantInfo.website.trim().replace(/\s/g, "").length || !restaurantInfo.priceRange.trim().replace(/\s/g, "").length){
    res.status(400).json({ error: 'Please enter valid strings for your inputs and not just empty spaces' });
    return;
  }

  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'The ID is not a valid Object ID' });
    return;
  }

  let phoneNo = /^\d{3}?(-)\d{3}(-)\d{4}$/;
  let pattern = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;

  if(!phoneNo.test(restaurantInfo.phoneNumber)) {
    res.status(400).json({ error: 'Phone number does not follow proper format' });
    return;
  }

  if(!pattern.test(restaurantInfo.website) || restaurantInfo.website.length < 20) {
    res.status(400).json({ error: 'The provided URL is not valid as per requirements. Please provide another URL' });
    return;
  }

  if(restaurantInfo.priceRange.length > 4 || (restaurantInfo.priceRange !== '$' && restaurantInfo.priceRange !== '$$' && restaurantInfo.priceRange !== '$$$' && restaurantInfo.priceRange !== '$$$$')) {
    res.status(400).json({ error: 'Price range given is not valid. Please enter a valid Price range' });
    return;
  }

  if (Array.isArray(restaurantInfo.cuisines)) {
    restaurantInfo.cuisines.forEach(element => {
        if( !element || typeof element != 'string' || !element.trim().toString().replace(/\s/g, "").length) {
          res.status(400).json({ error: 'Please provide proper array of cuisines' });
          return;
        }
    });
  } 
  else {
    res.status(400).json({ error: 'You must provide an array of cuisines' });
    return;
  }

  if (typeof restaurantInfo.serviceOptions !== 'object') {
    res.status(400).json({ error: 'Service options should be an object' });
    return;
  }

  if(!restaurantInfo.serviceOptions.hasOwnProperty('dineIn') || !restaurantInfo.serviceOptions.hasOwnProperty('takeOut') || !restaurantInfo.serviceOptions.hasOwnProperty('delivery')) {
    res.status(400).json({ error: 'Trying to insert wrong key. Please enter valid key' });
    return;
  }

  if(typeof restaurantInfo.serviceOptions.dineIn !== 'boolean' || typeof restaurantInfo.serviceOptions.takeOut !== 'boolean' || typeof restaurantInfo.serviceOptions.delivery !== 'boolean') {
    res.status(400).json({ error: 'The object keys should be boolean. Please check' });
    return;
  }
 
  try {
    await restaurantData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Restaurant not found' });
    return;
  }
  
  try {
    const updatedRestaurant = await restaurantData.update(req.params.id,
      restaurantInfo.name,
      restaurantInfo.location,
      restaurantInfo.phoneNumber,
      restaurantInfo.website,
      restaurantInfo.priceRange,
      restaurantInfo.cuisines,
      restaurantInfo.serviceOptions
    );
    res.json(updatedRestaurant);
  } catch (e) {
    res.status(e[0]).json({ error: e[1] });
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must provide an ID' });
    return;
  }

  if (!req.params.id.trim().replace(/\s/g, "").length) {
    res.status(400).json({ error: 'ID provided only contains blank spaces' });
    return;
  }

  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'The ID is not a valid Object ID' });
    return;
  }

  try {
    await restaurantData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Restaurant not found' });
    return;
  }
  
  try {
    const deletedRestaurant = await restaurantData.remove(req.params.id);
    res.json(deletedRestaurant);
  } catch (e) {
    res.status(400).json({ error: 'Restaurant cannot be deleted due to some error' });
  }
});

module.exports = router;