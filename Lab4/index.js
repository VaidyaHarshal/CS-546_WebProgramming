const restaurants = require('./data/restaurants');
const connection = require('./config/mongoConnection');

const main = async () => {
  let safrronLounge;
  let allRestaurants;
  let pizzaLounge;
  let indianMagic;
  let errorLounge;
  let updatedRestaurant;
  let removeRestaurant;
  let displayRestaurant;

  try {
    safrronLounge = await restaurants.create("The Saffron Lounge", "New York City, New York", "123-456-7891", "http://www.saffronlounge.com", "$$", ["Cuban", "Italian"], 5, {dineIn: true, takeOut: true, delivery: false});
    console.log(safrronLounge);
  } catch(e) {
    console.log(e);
  }
  
  try {
    pizzaLounge = await restaurants.create('Metropolitan Pizza', "Jersey City, New Jersey", "201-765-8352", "http://www.metropizza.com", "$$$", ["Mexican", "Italian", "Indian"], 4, {dineIn: true, takeOut: true, delivery: false});
  } catch(e) {
    console.log(e);
  }

  console.log("Getting all the restaurants")
  
  try {
    allRestaurants = await restaurants.getAll();
    console.log(allRestaurants);
  } catch(e) {
    console.log(e);
  }

  try {
    indianMagic = await restaurants.create('Indian Magic', "Metuchen, New Jersey", "201-641-7243", "http://www.indianmagic.com", "$$$$", ["Indian", "Chinese", "Mexican", "Italian","Thai"], 4, {dineIn: true, takeOut: true, delivery: true});
    console.log(indianMagic);
  } catch(e) {
    console.log(e);
  }

  console.log("Let's rename the website of first restaurant");

  try {
    updatedRestaurant = await restaurants.rename(allRestaurants[0]._id,"http://www.thesaffronl.com");
    console.log(updatedRestaurant);
  } catch(e) {
    console.log(e);
  }

  console.log("Now, lets remove the second restaurant which is being created")

  try {
    removeRestaurant = await restaurants.remove(allRestaurants[1]._id);
    console.log(removeRestaurant);
  } catch(e) {
    console.log(e);
  }

  try {
    allRestaurants = await restaurants.getAll();
    console.log(allRestaurants);
  } catch(e) {
    console.log(e);
  }

  try {
    errorLounge = await restaurants.create('The Error Restro', "New York City, New York", "2014562342", "http://www.error.com", "&&", "Cuban", 8, {parcel: true, takeOut: true, delivery: false});

    console.log(errorLounge);
  } catch(e) {
    console.log(e);
  }

  try {
    removeRestaurant = await restaurants.remove("6164f1a5d73fd7fb4436a553");
    console.log(removeRestaurant);
  } catch(e) {
    console.log(e);
  }

  try {
    updatedRestaurant = await restaurants.rename("6164f1a5d73fd7fb4436a555","http://www.thepizzalounge.com");
    console.log(updatedRestaurant);
  } catch(e) {
    console.log(e);
  }

  try {
    updatedRestaurant = await restaurants.rename("6164f1a5d73fd7fb4436a553","www.pizzaloungemetro.co.in");
    console.log(updatedRestaurant);
  } catch(e) {
    console.log(e);
  }

  try {
    displayRestaurant = await restaurants.get("testing"); 
    console.log(displayRestaurant);
  } catch(e) {
    console.log(e);
  }

  const db = await connection.connectToDb();
  await connection.closeConnection();
  console.log('Done!');
};

main().catch((error) => {
  console.log(error);
});