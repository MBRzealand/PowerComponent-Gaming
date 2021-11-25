const express = require('express');
const router = express.Router();
const ItemScheme = require('../model/itemscheme');

router.post('/', async function (req, res, next) {
  try {
    const item = await ItemScheme.create(req.body);
    res.status(201).json({
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const items = await ItemScheme.find({});
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
