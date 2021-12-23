const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const restaurantData = data.restaurants;
const { ObjectId } = require('mongodb');

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
    await restaurantData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Restaurant not found' });
    return;
  }

  try {
    let review = await reviewData.getAll(req.params.id);
    res.json(review);
  } catch (e) {
    res.status(404).json({ error: 'Review cannot be found' });
  }
});

router.post('/:id', async (req, res) => {
  let reviewInfo = req.body;

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

  if (!reviewInfo) {
    res.status(400).json({ error: 'You must provide data to create a review' });
    return;
  }

  if (!reviewInfo.title) {
    res.status(400).json({ error: 'You must provide a review title' });
    return;
  }

  if (!reviewInfo.reviewer) {
    res.status(400).json({ error: 'You must provide a reviewer name' });
    return;
  }

  if (!reviewInfo.rating) {
    res.status(400).json({ error: 'You must provide a rating' });
    return;
  }
  
  if (!reviewInfo.dateOfReview) {
    res.status(400).json({ error: 'You must provide a date of review' });
    return;
  }

  if (!reviewInfo.review) {
    res.status(400).json({ error: 'You must provide a review' });
    return;
  }

  if (typeof reviewInfo.title !== 'string' || typeof reviewInfo.reviewer !== 'string' || typeof reviewInfo.dateOfReview !== 'string' || typeof reviewInfo.review !== 'string') {
    res.status(400).json({ error: 'You must provide all the values in string except for rating' });
    return;
  }

  if (!reviewInfo.title.trim().replace(/\s/g, "").length || !reviewInfo.reviewer.trim().replace(/\s/g, "").length || !reviewInfo.dateOfReview.trim().replace(/\s/g, "").length || !reviewInfo.review.trim().replace(/\s/g, "").length) {
    res.status(400).json({ error: 'You must provide all the values and not empty spaces' });
    return;
  }

  if(typeof reviewInfo.rating !== 'number' || reviewInfo.rating < 1 || reviewInfo.rating > 5) {
    res.status(400).json({ error: 'You must provide a number for rating between 0 and 5' });
    return;
  }

  let pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  
  if(!pattern.test(reviewInfo.dateOfReview.trim())) {
    res.status(400).json({ error: 'Date provided is not in proper format' });
    return;
  } 
  
  let compareDate = reviewInfo.dateOfReview.replace(/\//g, "");
  
  if(parseInt(compareDate.substring(0,4)) === 229 || parseInt(compareDate.substring(0,4)) === 230 || parseInt(compareDate.substring(0,4)) === 231) {
    res.status(400).json({ error: 'The month of February only contains 28 days. Please enter correct date' });
    return;
  }

  if(parseInt(compareDate.substring(0,4)) === 431 || parseInt(compareDate.substring(0,4)) === 631 || parseInt(compareDate.substring(0,4)) === 931 || parseInt(compareDate.substring(0,4)) === 1131) {
    res.status(400).json({ error: 'The month mentioned only contains 30 days. Please enter correct date' });
    return;
  }

  let currentDate = new Date(); 
  let dateTime =  + (currentDate.getMonth()+1)  + "/"
                  + currentDate.getDate() + "/" 
                  + currentDate.getFullYear();
    
  dateTime = dateTime.replace(/\//g, ""); 
  dateTime = dateTime.substring(0,8);
  dateTime = parseInt(dateTime);

  if(compareDate < dateTime) {
    res.status(400).json({ error: 'The date provided is not of the current day but it is of previous days' });
    return;
  }
  else if(compareDate > dateTime) {
    res.status(400).json({ error: 'The date provided is not of the current day but it is of next days' });
    return;
  }
  
  try {
    await restaurantData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Restaurant not found' });
    return;
  }

  try {
    const newReview = await reviewData.create(req.params.id,
      reviewInfo.title.trim(),
      reviewInfo.reviewer.trim(),
      reviewInfo.rating,
      reviewInfo.dateOfReview.trim(),
      reviewInfo.review.trim()
    );
    res.json(newReview);
  } catch (e) {
    res.status(400).json({ error: 'Review cannot be created' });
    }
});

router.get('/review/:id', async (req, res) => {
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
    let review = await reviewData.get(req.params.id);
    res.json(review);
  } catch (e) {
    res.status(404).json({ error: 'Review not found' });
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
    await reviewData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
    
  try {
    const deletedReview = await reviewData.remove(req.params.id);
    res.json(deletedReview);
  } catch (e) {
    res.status(404).json({ error: 'Review cannot be deleted due to some error' });
  }
});

module.exports = router;