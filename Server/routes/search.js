const express = require('express');
const router = express.Router();
const ItemScheme = require('../model/itemscheme');

router.get('/:searchQuery', async (req, res, next) => {
  try {
    const { searchQuery: itemQuery } = req.params;

    const itemListFromName = await ItemScheme.find({
      name: { $regex: new RegExp(itemQuery, 'i') },
    });
    if (!itemListFromName) {
      return res.status(404).json({
        message: 'Item could not be found',
      });
    }
    const itemListFromCategories = await ItemScheme.find({
      categories: { $in: [itemQuery] },
    });
    if (!itemListFromCategories) {
      return res.status(404).json({
        message: 'Item could not be found',
      });
    }

    const itemListFromSpecifications = await ItemScheme.find({
      [`specifications.${itemQuery}`]: { $exists: true },
    });

    if (!itemListFromSpecifications) {
      return res.status(404).json({
        message: 'Item could not be found',
      });
    }

    const foundElements = {
      name: itemListFromName,
      categories: itemListFromCategories,
      specifications: itemListFromSpecifications,
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ foundElements });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/categorySearch/:categoryQuery', async (req, res, next) => {
  try {
    const { categoryQuery: category } = req.params;

    const itemListFromCategories = await ItemScheme.find({
      categories: { $in: [category] },
    });

    if (!itemListFromCategories) {
      return res.status(404).json({
        message: 'Item could not be found',
      });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ itemListFromCategories });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
