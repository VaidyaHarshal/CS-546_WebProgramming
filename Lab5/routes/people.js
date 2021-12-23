const express = require('express');
const router = express.Router();
const data = require('../data');
const allData = data.people;

router.get('/', async(req, res) => {
    try {
        const peopleList = await allData.getAllPeople();
        res.json(peopleList);
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    try {
      const peopleId = await allData.getPeopleById(req.params.id);
      res.json(peopleId);
    } catch (e) {
      res.status(404).json({ message: 'Id not found' });
    }
  });

module.exports = router;