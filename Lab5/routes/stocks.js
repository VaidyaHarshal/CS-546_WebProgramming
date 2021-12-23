const express = require('express');
const router = express.Router();
const data = require('../data');
const allStocks = data.stocks;

router.get('/', async(req, res) => {
    try {
        const stockList = await allStocks.getAllStocks();
        res.json(stockList);
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    try {
      const stockId = await allStocks.getStockById(req.params.id);
      res.json(stockId);
    } catch (e) {
      res.status(404).json({ message: 'Stock not found' });
    }
  });

module.exports = router;