const mongoCollections = require('../config/mongoCollections');
// const reviews = mongoCollections.reviews;
const restaurants = mongoCollections.restaurants;
const { ObjectId } = require('mongodb');

let exportedMethods = {
    async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
        if (!restaurantId || !title || !reviewer || !rating || !dateOfReview || !review)
            throw [400,"You must provide all valid inputs for your review"];

        if (typeof restaurantId !== 'string' || typeof title !== 'string' || typeof reviewer !== 'string' || typeof dateOfReview !== 'string' || typeof review !== 'string')
            throw [400,"Please enter a valid string for your review inputs"];

        if(!restaurantId.trim().replace(/\s/g, "").length || !title.trim().replace(/\s/g, "").length || !reviewer.trim().replace(/\s/g, "").length || !dateOfReview.trim().replace(/\s/g, "").length || !review.trim().replace(/\s/g, "").length)
            throw [400,"Only empty spaces in the review input strings are not allowed"];

        if(!ObjectId.isValid(restaurantId))
            throw [400,"The ID is not a valid Object ID"];

        if(typeof rating !== 'number' || rating < 0 || rating > 5)
            throw [400,"Please enter a valid rating"];

        let pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        let avgRating = 0;
        let arrayOfObject = [];

        if(!pattern.test(dateOfReview.trim()))
            throw [400,"The date provided is not a valid date. Please enter a valid date"];

        let compareDate = dateOfReview.replace(/\//g, "");

        if(parseInt(compareDate.substring(0,4)) === 229 || parseInt(compareDate.substring(0,4)) === 230 || parseInt(compareDate.substring(0,4)) === 231)
            throw [400,"The month of February only contains 28 days. Please enter correct date"];

        if(parseInt(compareDate.substring(0,4)) === 431 || parseInt(compareDate.substring(0,4)) === 631 || parseInt(compareDate.substring(0,4)) === 931 || parseInt(compareDate.substring(0,4)) === 1131)
            throw [400,"The month mentioned only contains 30 days. Please enter correct date"];

        compareDate = compareDate.substring(0,8);
        compareDate = parseInt(compareDate);

        let currentDate = new Date(); 
        let dateTime =  + (currentDate.getMonth()+1)  + "/"
                        + currentDate.getDate() + "/" 
                        + currentDate.getFullYear();

        dateTime = dateTime.replace(/\//g, ""); 
        dateTime = dateTime.substring(0,8);
        dateTime = parseInt(dateTime);

        if(compareDate < dateTime)
            throw [400,"The date provided is not of the current day but it is of previous days"];
      /*  else if(compareDate > dateTime)
            throw [400,"The date provided is not of the current day but it is of next days"];
*/
        const restaurantCollection = await restaurants();
        const sameRestro = await restaurantCollection.findOne({ _id: ObjectId(restaurantId)});

        if(sameRestro === null)
            throw [400,"Restaurant you are trying to add a review for does not exist. Please try again for another restaurant"];

        const newReview = {
            _id: new ObjectId(),
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        };

        console.log("Inside the create review function");
        const updateReview = await restaurantCollection.updateOne(
            {_id: ObjectId(restaurantId)},
            {$push: {reviews: newReview}}
        )

        if(!updateReview.matchedCount && !updateReview.modifiedCount)
            throw [400,"Update of the reviews has been failed"];

        const sameReview = await restaurantCollection.findOne({ _id: ObjectId(restaurantId)});

        if(sameReview === null)
                throw [404,"Restaurant you are trying to add a review for does not exist. Please try again for another restaurant"];

        arrayOfObject.push(sameReview);

        arrayOfObject.forEach(element => {
            element.reviews.forEach(data => {
                avgRating += data.rating;
            });
        });

        avgRating = (avgRating/sameReview.reviews.length);

        const reviewUpdate = await restaurantCollection.updateOne(
            {_id: ObjectId(restaurantId)},
            {$set: {overallRating: avgRating}}
        )

        if(!reviewUpdate.matchedCount && !reviewUpdate.modifiedCount)
            throw [400,"Update of the rating has been failed"];

        const restro = await restaurantCollection.findOne({ _id: ObjectId(restaurantId)});
        
        if (restro === null)
            throw [400,"No restaurant found with that id"];
    
        restro._id = restro._id.toString();
     
        for(let key in restro) {
            if(typeof restro[key] === 'object' && key === "reviews") {
                if(Array.isArray(restro[key])) {
                    for(let i = 0; i < restro[key].length; i++) {
                        restro[key][i]._id = restro[key][i]._id.toString();
                    }
                }
            }
        }
        return restro;
    },

    async getAll(restaurantId) {
        if (!restaurantId)
            throw [400,"You must provide valid Id input for your review"];
        
        if (typeof restaurantId !== 'string')
            throw [400,"Please enter a valid string for your review Id inputs"];

        if(!restaurantId.trim().replace(/\s/g, "").length)
            throw [400,"Only empty spaces in the review Id input is not allowed"];

        if(!ObjectId.isValid(restaurantId))
            throw [400,"The ID is not a valid Object ID"];

        console.log("Inside get all function of the review");
        const restaurantCollection = await restaurants();
        const restro = await restaurantCollection.findOne({ _id: ObjectId(restaurantId)});
    
        if (restro === null)
            throw [404,"No restaurant found with that id"];

        restro.reviews.forEach(element => {
            element._id = element._id.toString();
        })
        return restro.reviews;
    },

    async get(reviewId) {
        if (!reviewId)
            throw [400,"You must provide valid reviewId input for your review"];
        
        if (typeof reviewId !== 'string')
            throw [400,"Please enter a valid string for your reviewId inputs"];

        if(!reviewId.trim().replace(/\s/g, "").length)
            throw [400,"Only empty spaces in the reviewId input is not allowed"];

        if(!ObjectId.isValid(reviewId))
            throw [400,"The ID is not a valid Object ID"];   
            
        let resultData = {};
        console.log("Inside the get review by ID function");
        const restaurantCollection = await restaurants();
        const restro = await restaurantCollection.find({}).toArray();

        if(restro === null)
            throw [404,"No review present with that Id"];

        restro.forEach(element => {
            element.reviews.forEach(data => {
                if(data._id.toString() === reviewId) {
                    resultData = {"_id": data._id, "title": data.title, "reviewer": data.reviewer, "rating": data.rating, "dateOfReview": data.dateOfReview, "review": data.review};
                }
            })
        });

        resultData._id = resultData._id.toString();
        return resultData;
    },

    async remove(reviewId) {
        if (!reviewId)
            throw [400,"You must provide valid reviewId input for your review"];
        
        if (typeof reviewId !== 'string')
            throw [400,"Please enter a valid string for your reviewId inputs"];

        if(!reviewId.trim().replace(/\s/g, "").length)
            throw [400,"Only empty spaces in the reviewId input is not allowed"];

        if(!ObjectId.isValid(reviewId))
            throw [400,"The ID is not a valid Object ID"];

        let restaurantId = "";
        let avgRating = 0;
        let resultData = {};        
        console.log("Inside the remove review by ID function");
        const restaurantCollection = await restaurants();
        const restro = await restaurantCollection.find({}).toArray();
    
        if(restro === null)
            throw [400,"No review present with that Id"];

        restro.forEach(element => {
            element.reviews.forEach(data => {
                if(data._id.toString() === reviewId) {
                    restaurantId = element._id;
                }
            })
        });

        const removeReview = await restaurantCollection.updateOne({}, {$pull: {reviews: {_id: ObjectId(reviewId)}}});
    
        if(!removeReview.matchedCount && !removeReview.modifiedCount)
            throw [400,"Removal of review has failed"];
        
        const restroReview = await restaurantCollection.find({}).toArray();
    
        if(restroReview === null)
            throw [404,"No review present with that Id"];

        restroReview.forEach(element => {
            if(element._id.toString() === restaurantId.toString()) {
                element.reviews.forEach(data => {
                    avgRating += data.rating;
                })
                avgRating = (avgRating/element.reviews.length);
            }
        });
    
        const reviewUpdate = await restaurantCollection.updateOne(
            {_id: ObjectId(restaurantId)},
            {$set: {overallRating: avgRating}}
        )
    
        if(!reviewUpdate.matchedCount && !reviewUpdate.modifiedCount)
            throw [400,"Update of the rating has been failed"];

        resultData = {"reviewId": reviewId, "deleted": true};
        console.log(resultData);    
        return resultData;
    }
}

module.exports = exportedMethods;